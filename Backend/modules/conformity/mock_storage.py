import json
import logging
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional

logger = logging.getLogger(__name__)

class MockStorage:
    def __init__(self, file_path: Path):
        self.file_path = file_path
        self._ensure_file_exists()

    def _ensure_file_exists(self):
        if not self.file_path.exists():
            self.file_path.parent.mkdir(parents=True, exist_ok=True)
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump({"analysis_history": [], "non_conformities": []}, f)

    def _read_data(self) -> Dict[str, Any]:
        try:
            with open(self.file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error reading mock storage: {e}")
            return {"analysis_history": [], "non_conformities": []}

    def _write_data(self, data: Dict[str, Any]):
        try:
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, default=str)
        except Exception as e:
            logger.error(f"Error writing mock storage: {e}")

    def save_analysis(self, analysis: Dict[str, Any]) -> str:
        data = self._read_data()
        analysis_id = str(len(data["analysis_history"]) + 1)
        analysis["_id"] = analysis_id
        if isinstance(analysis.get("analysis_date"), datetime):
            analysis["analysis_date"] = analysis["analysis_date"].isoformat()
        data["analysis_history"].insert(0, analysis)
        self._write_data(data)
        return analysis_id

    def get_history(self, limit: int = 10) -> List[Dict[str, Any]]:
        data = self._read_data()
        return data["analysis_history"][:limit]

    def save_nc(self, nc: Dict[str, Any]) -> str:
        data = self._read_data()
        nc_id = str(len(data["non_conformities"]) + 1)
        nc["_id"] = nc_id
        if isinstance(nc.get("created_at"), datetime):
            nc["created_at"] = nc["created_at"].isoformat()
        if isinstance(nc.get("updated_at"), datetime):
            nc["updated_at"] = nc["updated_at"].isoformat()
        data["non_conformities"].insert(0, nc)
        self._write_data(data)
        return nc_id

    def get_ncs(self, limit: int = 100) -> List[Dict[str, Any]]:
        data = self._read_data()
        return data["non_conformities"][:limit]

    def update_nc_status(self, nc_id: str, status: str) -> bool:
        data = self._read_data()
        for nc in data["non_conformities"]:
            if nc["_id"] == nc_id:
                nc["status"] = status
                nc["updated_at"] = datetime.now().isoformat()
                self._write_data(data)
                return True
        return False

    def get_stats(self) -> Dict[str, Any]:
        data = self._read_data()
        history = data["analysis_history"]
        total_analyses = len(history)
        avg_score = 0
        if total_analyses > 0:
            avg_score = sum(item.get("score", 0) for item in history) / total_analyses
        
        # Simple count for this week
        this_week = 0
        now = datetime.now()
        for item in history:
            try:
                dt = datetime.fromisoformat(item["analysis_date"])
                if (now - dt).days <= 7:
                    this_week += 1
            except:
                continue
                
        return {
            "total_analyses": total_analyses,
            "average_score": int(avg_score),
            "this_week": this_week
        }

    def delete_analysis(self, analysis_id: str) -> bool:
        data = self._read_data()
        initial_len = len(data["analysis_history"])
        data["analysis_history"] = [
            item for item in data["analysis_history"] 
            if str(item.get("_id")) != str(analysis_id)
        ]
        
        if len(data["analysis_history"]) < initial_len:
            self._write_data(data)
            return True
        return False

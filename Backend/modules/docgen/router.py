from fastapi import APIRouter

router = APIRouter(tags=["DocGen"])

@router.get("/docgen/status")
async def docgen_status():
    return {"status": "DocGen module ready for integration"}

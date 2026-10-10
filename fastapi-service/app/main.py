
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="DevOps Control Center API")

class HealthResponse(BaseModel):
    status: str
    service: str

@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(
        status="UP",
        service="devops-control-center-fastapi"
    )

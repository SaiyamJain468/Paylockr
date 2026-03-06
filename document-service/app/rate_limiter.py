# Made by Saiyam Jain - https://github.com/saiyamjain468
"""
Rate limiting middleware for FastAPI
Prevents abuse by limiting requests per user/IP
"""

from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from collections import defaultdict
from datetime import datetime, timedelta
import asyncio

class RateLimiter:
    def __init__(self, requests_per_minute: int = 100):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)
        self.cleanup_task = None
    
    async def check_rate_limit(self, identifier: str) -> bool:
        now = datetime.now()
        minute_ago = now - timedelta(minutes=1)
        
        # Clean old requests
        self.requests[identifier] = [
            req_time for req_time in self.requests[identifier]
            if req_time > minute_ago
        ]
        
        # Check limit
        if len(self.requests[identifier]) >= self.requests_per_minute:
            return False
        
        self.requests[identifier].append(now)
        return True
    
    async def cleanup_old_entries(self):
        """Periodic cleanup of old entries"""
        while True:
            await asyncio.sleep(300)  # Every 5 minutes
            now = datetime.now()
            hour_ago = now - timedelta(hours=1)
            
            # Remove entries older than 1 hour
            for key in list(self.requests.keys()):
                self.requests[key] = [
                    req_time for req_time in self.requests[key]
                    if req_time > hour_ago
                ]
                if not self.requests[key]:
                    del self.requests[key]

rate_limiter = RateLimiter(requests_per_minute=100)

async def rate_limit_middleware(request: Request, call_next):
    # Get identifier (user_id from header or IP address)
    identifier = request.headers.get("X-User-ID") or request.client.host
    
    # Skip rate limiting for health checks
    if request.url.path == "/health":
        return await call_next(request)
    
    # Check rate limit
    if not await rate_limiter.check_rate_limit(identifier):
        return JSONResponse(
            status_code=429,
            content={
                "error": "Rate limit exceeded",
                "detail": f"Maximum {rate_limiter.requests_per_minute} requests per minute allowed"
            }
        )
    
    return await call_next(request)

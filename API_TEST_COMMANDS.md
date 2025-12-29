# API Test Commands

## 1. Register User (Password must have 8+ chars, 1 uppercase, 1 special char)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/users/register" -Method POST -ContentType "application/json" -Body '{\"username\": \"johndoe\", \"password\": \"Password@123\", \"email\": \"john@example.com\"}'
```

## 2. Register User with Weak Password (Should Fail)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/users/register" -Method POST -ContentType "application/json" -Body '{\"username\": \"janedoe\", \"password\": \"weak\", \"email\": \"jane@example.com\"}'
```

## 3. Login User (Get JWT Token)
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:8080/api/users/login" -Method POST -ContentType "application/json" -Body '{\"username\": \"johndoe\", \"password\": \"Password@123\"}'
$token = $response.token
$response
```

## 4. Get User By ID (Protected - Requires JWT Token)
```powershell
# First get the user ID from register or login response
$userId = $response.id  # or use the ID from register response
Invoke-RestMethod -Uri "http://localhost:8080/api/users/$userId" -Method GET -Headers @{Authorization="Bearer $token"}
```

## 5. Update User (Protected - Requires JWT Token)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/users/$userId" -Method PUT -ContentType "application/json" -Headers @{Authorization="Bearer $token"} -Body '{\"username\": \"johndoe_updated\", \"password\": \"NewPass@456\", \"email\": \"john.updated@example.com\"}'
```

## 6. Delete User (Protected - Requires JWT Token)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/users/$userId" -Method DELETE -Headers @{Authorization="Bearer $token"}
```

## Password Validation Rules
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 special character (!@#$%^&*()_+-=[]{}|;:,.<>?)

## Valid password examples:
- Password@123
- SecurePass#456
- MyP@ssw0rd
- Test$Password1

## Invalid password examples:
- password123 (no uppercase, no special char)
- PASSWORD! (less than 8 chars)
- Password123 (no special char)
- password@test (no uppercase)

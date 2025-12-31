# API Test Commands

This document provides a set of PowerShell commands to test the Food Delivery API endpoints.

---

## 1. User Management

### Register a New User
Password must meet complexity requirements: 8+ characters, 1 uppercase letter, 1 special character.
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/users/register" -Method POST -ContentType "application/json" -Body '{\"username\": \"johndoe\", \"password\": \"Password@123\", \"email\": \"john@example.com\"}'
```

### Register with a Weak Password (Should Fail)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/users/register" -Method POST -ContentType "application/json" -Body '{\"username\": \"janedoe\", \"password\": \"weak\", \"email\": \"jane@example.com\"}'
```

### Login to Get JWT Token
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:8080/users/login" -Method POST -ContentType "application/json" -Body '{\"email\": \"john@example.com\", \"password\": \"Password@123\"}'
$token = $response.token
$userId = $response.id
Write-Host "Token: $token"
Write-Host "User ID: $userId"
```

### Get User By ID (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/users/$userId" -Method GET -Headers @{Authorization="Bearer $token"}
```

### Update User (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/users/$userId" -Method PUT -ContentType "application/json" -Headers @{Authorization="Bearer $token"} -Body '{\"username\": \"johndoe_updated\", \"email\": \"john.updated@example.com\"}'
```

### Delete User (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/users/$userId" -Method DELETE -Headers @{Authorization="Bearer $token"}
```

---

## 2. Food Management

First, ensure you have a JWT token from the login step.

### Add a New Food Item (Protected)
This is a multipart request. Create a JSON file `food.json` with the food details:
```json
{
  "name": "Spicy Pepperoni Pizza",
  "description": "Classic pizza with a spicy kick.",
  "price": 14.99,
  "category": "Pizza"
}
```
Then, run the command:
```powershell
$foodJson = Get-Content -Raw -Path .\food.json
$fileBytes = [System.IO.File]::ReadAllBytes("C:\path\to\your\image.jpg")

$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"
$body = (
    "--$boundary" + $LF +
    "Content-Disposition: form-data; name=`"food`"" + $LF +
    "Content-Type: application/json" + $LF + $LF +
    $foodJson + $LF +
    "--$boundary" + $LF +
    "Content-Disposition: form-data; name=`"file`"; filename=`"image.jpg`"" + $LF +
    "Content-Type: image/jpeg" + $LF + $LF +
    [System.Text.Encoding]::GetEncoding('iso-8859-1').GetString($fileBytes) + $LF +
    "--$boundary--" + $LF
)

$response = Invoke-RestMethod -Uri "http://localhost:8080/foods" -Method POST -ContentType "multipart/form-data; boundary=`"$boundary`"" -Headers @{Authorization="Bearer $token"} -Body $body
$foodId = $response.id
Write-Host "Created Food ID: $foodId"
```

### Get All Food Items (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/foods" -Method GET -Headers @{Authorization="Bearer $token"}
```

### Delete a Food Item (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/foods/$foodId" -Method DELETE -Headers @{Authorization="Bearer $token"}
```

---

## 3. Cart Management

First, ensure you have a JWT token and a valid `$foodId`.

### Add Item to Cart (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/cart/add" -Method POST -ContentType "application/json" -Headers @{Authorization="Bearer $token"} -Body "{\`"foodId\`": \`"$foodId\`", \`"quantity\`": 1}"
```

### Get Cart Contents (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/cart" -Method GET -Headers @{Authorization="Bearer $token"}
```

### Update Item Quantity in Cart (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/cart/update" -Method PUT -ContentType "application/json" -Headers @{Authorization="Bearer $token"} -Body "{\`"foodId\`": \`"$foodId\`", \`"quantity\`": 3}"
```

### Remove Item from Cart (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/cart/remove/$foodId" -Method DELETE -Headers @{Authorization="Bearer $token"}
```

### Clear the Entire Cart (Protected)
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/cart/clear" -Method DELETE -Headers @{Authorization="Bearer $token"}
```

---

## Password Validation Rules
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 special character (!@#$%^&*()_+-=[]{}|;:,.<>?)

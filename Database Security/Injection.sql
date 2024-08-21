-- SQL Injection (Attack):
DECLARE @CustomerName2 NVARCHAR(255);
SET @CustomerName2 = 'Aimee Bixby OR 1=1'; -- Malicious input

DECLARE @Query2 NVARCHAR(MAX);
SET @Query2 = '
SELECT *
FROM [TestDB].[dbo].[tblCustomer]
WHERE CustName LIKE ''%'' + @CustomerName2 + ''%'';
';

EXEC sp_executesql @Query2, N'@CustomerName2 NVARCHAR(255)', @CustomerName2;

-- Parameterized Query (Protect):
DECLARE @CustomerName3 NVARCHAR(255);
SET @CustomerName3 = 'Aimee Bixby'; -- Malicious input

DECLARE @Query3 NVARCHAR(MAX);
SET @Query3 = '
SELECT *
FROM [TestDB].[dbo].[tblCustomer]
WHERE CustName LIKE ''%'' + @CustomerName3 + ''%'';
';

EXEC sp_executesql @Query3, N'@CustomerName3 NVARCHAR(255)', @CustomerName3;
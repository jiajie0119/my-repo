-- Step 1: Set the database to single-user mode and rollback any open transactions
USE master;
GO
ALTER DATABASE TestDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

-- Step 2: Restore the database from the backup file
USE master;
GO
RESTORE DATABASE [TestDB] FROM DISK = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\Backup\TestDB_20240229_115159.bak' WITH FILE = 1, NOUNLOAD, STATS = 5;
GO

-- Step 3: Set the database back to multi-user mode
ALTER DATABASE TestDB SET MULTI_USER;
GO
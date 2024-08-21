DECLARE @BackupPath NVARCHAR(255)
DECLARE @Timestamp NVARCHAR(255)
SET @Timestamp = REPLACE(REPLACE(CONVERT(VARCHAR(19), GETDATE(), 120), '-', ''), ' ', '_')
SET @Timestamp = REPLACE(REPLACE(@Timestamp, ':', ''), '.', '')
SET @BackupPath = 'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\Backup\TestDB_' + @Timestamp + '.bak'

BACKUP DATABASE [TestDB] TO DISK = @BackupPath WITH NOFORMAT, NOINIT, NAME = N'TestDB-Full Database Backup', 
SKIP, NOREWIND, NOUNLOAD, STATS = 10
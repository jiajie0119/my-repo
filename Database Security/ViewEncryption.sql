-- view key metadata and column encryption

SELECT * FROM sys.column_master_keys;
SELECT * FROM sys.column_encryption_keys
SELECT * FROM sys.column_encryption_key_values

SELECT
[name]
, [encryption_type]
, [encryption_type_desc]
, [encryption_algorithm_name]
, [column_encryption_key_id]
FROM sys.columns
WHERE [encryption_type] IS NOT NULL;
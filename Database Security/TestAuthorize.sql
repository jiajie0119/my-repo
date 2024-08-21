-- SELECT PERMISSION
SELECT * FROM dbo.tblCustomer;

SELECT
	ProductName,
	Category,
	FORMAT(Unit_Price, 'C', 'en-US') AS 'Amount'
FROM
	tblProduct
WHERE Category = 'Paper'	-- Binders, Art, Labels

-- UPDATE 
UPDATE dbo.tblCustomer SET CustName = 'Alex Avil' WHERE CustID = 'AA-10315';

-- INSERT
INSERT INTO dbo.tblCustomer (CustID, CustName, Segment, City, State, PostalCode, Region)
VALUES ('ES-14010', 'Ed Sheeran', 'Consumer', 'New York City', 'New York', '10024', 'East');


-- DELETE
DELETE FROM dbo.tblCustomer WHERE CustID = 'AA-10315';
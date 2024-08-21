USE TestDB;

GRANT SELECT ON dbo.tblCustomer TO CustomerRole;
GRANT SELECT ON dbo.tblOrder TO CustomerRole;
GRANT SELECT ON dbo.tblOrder_Shipment TO CustomerRole;
GRANT SELECT ON dbo.tblProduct TO CustomerRole;


DENY INSERT, UPDATE, DELETE ON dbo.tblCustomer TO CustomerRole;
DENY INSERT, UPDATE, DELETE ON dbo.tblOrder TO CustomerRole;
DENY INSERT, UPDATE, DELETE ON dbo.tblOrder_Shipment TO CustomerRole;
DENY INSERT, UPDATE, DELETE ON dbo.tblProduct TO CustomerRole;
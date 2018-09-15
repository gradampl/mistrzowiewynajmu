using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MistrzowieWynajmu.Migrations
{
    public partial class Initialcorrected : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Owners (Name,Surname,Phone) VALUES ('Adam','Kowalski','895324554')");
            migrationBuilder.Sql("INSERT INTO Owners (Name,Surname,Phone) VALUES ('Joanna','Murawiec','224326564')");
            migrationBuilder.Sql("INSERT INTO Owners (Name,Surname,Phone) VALUES ('Wanda','Chotomska','793101332')");

            migrationBuilder.Sql("INSERT INTO Addresses (Street,City) VALUES ('Żwirowa','Piastów')");
            migrationBuilder.Sql("INSERT INTO Addresses (Street,City) VALUES ('Piastowska','Żuromin')");
            migrationBuilder.Sql("INSERT INTO Addresses (Street,City) VALUES ('Chełmińska','Piekary')");

            migrationBuilder.Sql("INSERT INTO Properties (Type,Description,Rooms,Area,Washer,Refrigerator,Iron,AddressId,OwnerId) VALUES (0,'Bardzo ładny dom',6,110,1,1,1,1,1)");
            migrationBuilder.Sql("INSERT INTO Properties (Type,Description,Rooms,Area,Washer,Refrigerator,Iron,AddressId,OwnerId) VALUES (1,'Bardzo ładne mieszkanie',3,58,1,1,0,2,2)");
            migrationBuilder.Sql("INSERT INTO Properties (Type,Description,Rooms,Area,Washer,Refrigerator,Iron,AddressId,OwnerId) VALUES (0,'Bardzo duży dom',10,180,1,1,1,3,3)");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Owners");
            migrationBuilder.Sql("DELETE FROM Addresses");
            migrationBuilder.Sql("DELETE FROM Properties");
        }
    }
}

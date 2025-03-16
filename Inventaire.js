import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function VehicleInventory() {
  const [vehicles, setVehicles] = useState([]);
  const [chassisNumber, setChassisNumber] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [inventoryDate, setInventoryDate] = useState(new Date().toISOString().split('T')[0]);
  const [inventoryLocation, setInventoryLocation] = useState("");
  const [observation, setObservation] = useState("");
  const [isDateFixed, setIsDateFixed] = useState(false);
  const [isLocationFixed, setIsLocationFixed] = useState(false);

  const scanBarcode = () => {
    // Simuler un scan (à intégrer avec un scanner réel comme QuaggaJS ou une API mobile)
    const scannedValue = prompt("Scannez une plaque d'immatriculation ou un numéro de châssis");
    if (scannedValue) {
      if (scannedValue.length > 8) {
        setChassisNumber(scannedValue);
      } else {
        setLicensePlate(scannedValue);
      }
    }
  };

  const addVehicle = () => {
    if (!chassisNumber && !licensePlate) {
      alert("Veuillez renseigner soit le numéro de châssis, soit l'immatriculation");
      return;
    }
    const newVehicle = { chassisNumber, licensePlate, brand, model, mileage, inventoryDate, inventoryLocation, observation };
    setVehicles([...vehicles, newVehicle]);
    setChassisNumber("");
    setLicensePlate("");
    setBrand("");
    setModel("");
    setMileage("");
    setObservation("");
    setIsDateFixed(true);
    setIsLocationFixed(true);
  };

  const exportToExcel = () => {
    const csvContent = [
      ["Châssis", "Immatriculation", "Marque", "Modèle", "Kilométrage", "Date d'Inventaire", "Site", "Observation"],
      ...vehicles.map(vehicle => [
        vehicle.chassisNumber,
        vehicle.licensePlate,
        vehicle.brand,
        vehicle.model,
        vehicle.mileage,
        vehicle.inventoryDate,
        vehicle.inventoryLocation,
        vehicle.observation
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "inventory.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Inventaire de Véhicules</h1>
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Numéro de châssis" value={chassisNumber} onChange={(e) => setChassisNumber(e.target.value)} />
            <Input placeholder="Immatriculation" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
            <Button className="col-span-2" onClick={scanBarcode}>📷 Scanner</Button>
            <Input placeholder="Marque" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <Input placeholder="Modèle" value={model} onChange={(e) => setModel(e.target.value)} />
            <Input placeholder="Kilométrage" value={mileage} onChange={(e) => setMileage(e.target.value)} />
            <Input type="date" placeholder="Date d'inventaire" value={inventoryDate} disabled={isDateFixed} onChange={(e) => setInventoryDate(e.target.value)} />
            <Input placeholder="Site de l'inventaire" value={inventoryLocation} disabled={isLocationFixed} onChange={(e) => setInventoryLocation(e.target.value)} />
            <Input placeholder="Observation" value={observation} onChange={(e) => setObservation(e.target.value)} />
          </div>
          <Button className="mt-4" onClick={addVehicle}>Ajouter</Button>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Button onClick={exportToExcel}>Exporter vers Excel</Button>
      </div>
      <h2 className="text-lg font-semibold mt-6">Liste des véhicules</h2>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Châssis</TableHead>
            <TableHead>Immatriculation</TableHead>
            <TableHead>Marque</TableHead>
            <TableHead>Modèle</TableHead>
            <TableHead>Kilométrage</TableHead>
            <TableHead>Date d'Inventaire</TableHead>
            <TableHead>Site</TableHead>
            <TableHead>Observation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle, index) => (
            <TableRow key={index}>
              <TableCell>{vehicle.chassisNumber}</TableCell>
              <TableCell>{vehicle.licensePlate}</TableCell>
              <TableCell>{vehicle.brand}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.mileage}</TableCell>
              <TableCell>{vehicle.inventoryDate}</TableCell>
              <TableCell>{vehicle.inventoryLocation}</TableCell>
              <TableCell>{vehicle.observation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

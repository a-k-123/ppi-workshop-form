// Updated for client-side rendering compatibility with Vercel static build
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RegistrationForm() {
  const [staffType, setStaffType] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const isFree = ["UCL or UCLH", "UCLPartners' Partner Organisation"].includes(staffType);
  const pricePerWorkshop = staffType === "Non-profit organisation" ? 50 : staffType === "For-profit, industry, pharmaceutical" ? 85 : 0;
  const discount = workshops.length > 1 && pricePerWorkshop > 0 ? 10 : 0;
  const total = isFree ? "Free" : `£${Math.max(0, (pricePerWorkshop - discount) * workshops.length)}`;

  const toggleWorkshop = (value) => {
    setWorkshops((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!staffType) newErrors.staffType = true;
    if (staffType === "UCLPartners' Partner Organisation" && !organisation) newErrors.organisation = true;
    if (workshops.length === 0) newErrors.workshops = true;
    if (!isFree && !paymentMethod) newErrors.paymentMethod = true;
    if (!name) newErrors.name = true;
    if (!role) newErrors.role = true;
    if (!email) newErrors.email = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted!");
    }
  };

  const uclPartnersOrganisations = [
    "Barking, Havering and Redbridge University Hospitals NHS Trust",
    "Barts Health NHS Trust",
    "Care City",
    "City University of London",
    "East London NHS Foundation Trust",
    "Great Ormond Street Hospital for Children NHS Foundation Trust",
    "Health Innovation Network",
    "Homerton Healthcare NHS Foundation Trust",
    "MedCity",
    "Moorfields Eye Hospital NHS Foundation Trust",
    "NELFT NHS Foundation Trust",
    "NHS Innovation Accelerator",
    "NIHR Applied Research Collaboration North Thames",
    "NIHR Clinical Research Network North Thames",
    "North Central London Integrated Care System",
    "North East London Health & Care Partnership",
    "North London Mental Health Partnership",
    "North Middlesex University Hospital NHS Trust",
    "North Thames Genomic Medicine Service",
    "Queen Mary University of London",
    "Royal Free London NHS Foundation Trust",
    "Royal National Orthopaedic Hospital NHS Trust",
    "The Tavistock and Portman NHS Foundation Trust",
    "Whittington Health NHS Trust"
  ];

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#193E72] rounded-xl text-white">
      <img src="/BRC White Logo.png" alt="NIHR UCLH BRC Logo" className="w-72 mb-6" />
      <Card className="bg-white text-black p-4">
        <CardContent className="grid gap-4">
          <div>
            <Label>I am staff at</Label>
            <Select onValueChange={setStaffType}>
              <SelectTrigger className={errors.staffType ? "border-red-500" : ""}>
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UCL or UCLH">UCL or UCLH</SelectItem>
                <SelectItem value="UCLPartners' Partner Organisation">UCLPartners' Partner Organisation</SelectItem>
                <SelectItem value="Non-profit organisation">Non-profit organisation</SelectItem>
                <SelectItem value="For-profit, industry, pharmaceutical">For-profit, industry, pharmaceutical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {staffType === "UCLPartners' Partner Organisation" && (
            <div>
              <Label>Which organisation are you from?</Label>
              <Select onValueChange={setOrganisation}>
                <SelectTrigger className={errors.organisation ? "border-red-500" : ""}>
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {uclPartnersOrganisations.map((org) => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Workshops</Label>
            <div className={`space-y-1 ${errors.workshops ? "border border-red-500 rounded-md p-2" : ""}`}>
              {["Workshop A", "Workshop B", "Workshop C", "Workshop D"].map((ws) => (
                <label key={ws} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={ws}
                    checked={workshops.includes(ws)}
                    onChange={() => toggleWorkshop(ws)}
                  />
                  <span>{ws}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label>Total cost</Label>
            <Input value={total} disabled />
          </div>

          {!isFree && (
            <div>
              <Label>What method of payment would you like to use?</Label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger className={errors.paymentMethod ? "border-red-500" : ""}>
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer (BACS)">Bank Transfer (BACS)</SelectItem>
                  <SelectItem value="Purchase Order (PO)">Purchase Order (PO)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className={errors.name ? "border-red-500" : ""} />
          </div>
          <div>
            <Label>Role/Job title</Label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} className={errors.role ? "border-red-500" : ""} />
          </div>
          <div>
            <Label>Email address</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={errors.email ? "border-red-500" : ""} />
          </div>

          <Button className="mt-4" onClick={handleSubmit}>Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
}

"use client"; // to get react to know it's a client compponent

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postClub } from "@/services/clubServices";


import { Card, CardContent, CardHeader, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import {Form, FormField, FormItem, FormLabel, FormMessage, FormControl} from "@/components/ui/form";

import * as z from "zod";
import ClubRegistrationForm from "@/components/ui/club-registration-form";
import FormWrapper from "@/components/ui/form-wrapper";



export default function Page() {

  return (
    <section className="w-full pt-20">
      <div className="h-screen flex items-center justify-center w-full">
        <FormWrapper label="Registration Form" title="Register a Club">
          <ClubRegistrationForm />
        </FormWrapper>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, User, Calendar, Phone, Mail, MapPin, FileText, CreditCard, Shield, Award } from 'lucide-react';

const registerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  certification: z.any().optional(),
  driversLicense: z.any().optional(),
  ssn: z.any().optional(),
  resume: z.any().optional(),
});

type FormValues = z.infer<typeof registerFormSchema>;

export default function DoctorRegister() {
  const [activeTab, setActiveTab] = useState<'marketer' | 'doctor'>('doctor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Handle form submission here
      console.log('Form data:', data);
      // Redirect after successful registration
      router.push('/doctor/login');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (field: keyof FormValues, file: File) => {
    form.setValue(field, file);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Register</h1>
            
            {/* Tabs */}
            <div className="flex justify-center space-x-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('marketer')}
                className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'marketer'
                    ? 'border-secondary text-secondary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Marketer
              </button>
              <button
                onClick={() => setActiveTab('doctor')}
                className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'doctor'
                    ? 'border-secondary text-secondary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Doctor
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="shadow-xl border-none">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                {activeTab === 'marketer' ? 'Marketer' : 'Doctor'} Registration
              </h2>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">First name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                              <Input 
                                className="pl-10" 
                                placeholder="Enter first name" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Date of Birth</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                              <Input 
                                className="pl-10" 
                                placeholder="dd/mm/yyyy" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Middle name (optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                              <Input 
                                className="pl-10" 
                                placeholder="Enter middle name" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                              <Input 
                                className="pl-10" 
                                placeholder="Enter Phone number" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Last name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                              <Input 
                                className="pl-10" 
                                placeholder="Enter last name" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                              <Input 
                                className="pl-10" 
                                placeholder="Enter email" 
                                type="email"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Address - Full Width */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                            <Input 
                              className="pl-10" 
                              placeholder="Address" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Document Upload Sections */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Document Upload</h3>
                    
                    {/* Certification */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Award className="h-6 w-6 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Certification</p>
                            <p className="text-xs text-gray-500">Drag or drop your Certificate</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => document.getElementById('certification')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                      <input
                        id="certification"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('certification', file);
                        }}
                      />
                    </div>

                    {/* Drivers License */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Drivers License</p>
                            <p className="text-xs text-gray-500">Drag or drop your Certificate</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => document.getElementById('driversLicense')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                      <input
                        id="driversLicense"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('driversLicense', file);
                        }}
                      />
                    </div>

                    {/* SSN */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-6 w-6 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">SSN</p>
                            <p className="text-xs text-gray-500">Drag or drop your Certificate</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => document.getElementById('ssn')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                      <input
                        id="ssn"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('ssn', file);
                        }}
                      />
                    </div>

                    {/* Resume */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-6 w-6 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Resume</p>
                            <p className="text-xs text-gray-500">Drag or drop your Certificate</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => document.getElementById('resume')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                      <input
                        id="resume"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('resume', file);
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      variant="secondary"
                      className="w-full py-3 text-lg font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link href="/doctor/login" className="text-secondary hover:text-secondary/80 font-medium">
                        Login here
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

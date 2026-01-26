"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Bell, Lock, Mail, User, Shield, Save, Upload } from "lucide-react";

export default function DashboardInstructorSettings() {
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your instructor profile, account, and preferences
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* PROFILE TAB */}
            <TabsContent value="profile" className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Instructor"
                  />
                  <AvatarFallback>MI</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-lg font-medium">Muhammad Instructor</h3>
                  <p className="text-sm text-muted-foreground">
                    Pro Instructor • Islamabad, Pakistan
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                    <Button size="sm" variant="ghost">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Muhammad Instructor" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    defaultValue="Full-Stack Developer & Instructor | React • Next.js • TypeScript"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="Passionate about teaching modern web development. 5+ years of experience in React, Next.js, TypeScript, and building scalable applications. Helping 10,000+ students learn to code."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website / Portfolio</Label>
                  <Input
                    id="website"
                    type="url"
                    defaultValue="https://muhammad-portfolio.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X Handle</Label>
                  <Input id="twitter" defaultValue="@muhammad_dev" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile Changes
                </Button>
              </div>
            </TabsContent>

            {/* ACCOUNT TAB */}
            <TabsContent value="account" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="email"
                      type="email"
                      defaultValue="muhammad@example.com"
                      className="flex-1"
                    />
                    <Badge variant="outline">Verified</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <select
                    id="language"
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="en"
                  >
                    <option value="en">English</option>
                    <option value="ur">Urdu</option>
                    <option value="both">English + Urdu</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Connected Accounts</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      G
                    </div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Disconnect
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* NOTIFICATIONS TAB */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Email Notifications</h4>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New course enrollment</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a student enrolls in your course
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New review or rating</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails for new student reviews
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Monthly revenue summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Get monthly earnings report
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Promotional emails from Z-Academy</Label>
                    <p className="text-sm text-muted-foreground">
                      Tips, updates, and special offers
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>

            {/* SECURITY TAB */}
            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Shield className="h-10 w-10 text-primary" />
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Last changed: December 15, 2025
                    </p>
                  </div>
                </div>

                <Button variant="outline">Change Password</Button>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Login Sessions</h4>
                  <div className="rounded-md border p-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">
                          Chrome on Windows • Islamabad
                        </p>
                        <p className="text-muted-foreground">
                          Active now • This device
                        </p>
                      </div>
                      <Badge>Current Session</Badge>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">
                    Log out all other sessions
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

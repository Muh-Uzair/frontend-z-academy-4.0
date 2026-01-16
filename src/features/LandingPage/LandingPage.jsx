import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Globe, Users, Zap } from "lucide-react";
import LandingPageHeader from "@/components/LandingPageHeader";

const LandingPage = () => {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-300">
        <LandingPageHeader />
        <main className="pt-12.5">
          {/* Hero */}
          <section className="p-6 text-center md:p-12">
            <div className="from-primary-extra-light/50 to-primary-extra-light flex h-62.5 flex-col items-center justify-center rounded-md bg-gradient-to-b">
              <h1 className="text-3xl font-bold text-gray-800 md:text-5xl">
                Learn. Grow. Achieve.
              </h1>
              <p className="mt-3 max-w-2xl text-gray-600">
                Unlock your potential with modern courses, expert mentors, and a
                thriving community of learners.
              </p>
              <Button className="mt-6 rounded-xl px-8 py-6 text-lg">
                Get Started
              </Button>
            </div>
          </section>

          {/* Features */}
          <section className="p-6 md:p-12">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Why Choose Us?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="rounded-2xl text-center shadow-md">
                <CardContent className="space-y-3 p-6">
                  <GraduationCap className="text-primary mx-auto h-10 w-10" />
                  <h3 className="text-lg font-semibold">Expert Instructors</h3>
                  <p className="text-sm text-gray-600">
                    Learn from industry professionals with years of real-world
                    experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl text-center shadow-md">
                <CardContent className="space-y-3 p-6">
                  <Globe className="text-primary mx-auto h-10 w-10" />
                  <h3 className="text-lg font-semibold">Global Community</h3>
                  <p className="text-sm text-gray-600">
                    Connect with learners across the world and grow together.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl text-center shadow-md">
                <CardContent className="space-y-3 p-6">
                  <Users className="text-primary mx-auto h-10 w-10" />
                  <h3 className="text-lg font-semibold">Peer Support</h3>
                  <p className="text-sm text-gray-600">
                    Collaborate on projects and build networks that last.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl text-center shadow-md">
                <CardContent className="space-y-3 p-6">
                  <Zap className="text-primary mx-auto h-10 w-10" />
                  <h3 className="text-lg font-semibold">Fast Learning</h3>
                  <p className="text-sm text-gray-600">
                    Interactive lessons and resources designed to accelerate
                    your growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-gray-50 p-6 md:p-12">
            <h2 className="mb-8 text-center text-2xl font-bold">
              What Our Students Say
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <p className="text-gray-700 italic">
                    “This platform completely changed the way I learn. The
                    instructors are amazing!”
                  </p>
                  <p className="mt-4 font-semibold">— Sarah K.</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <p className="text-gray-700 italic">
                    “The courses are practical, engaging, and helped me land my
                    first tech job.”
                  </p>
                  <p className="mt-4 font-semibold">— Ali R.</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <p className="text-gray-700 italic">
                    “I love the community aspect. I’ve made friends and found
                    mentors.”
                  </p>
                  <p className="mt-4 font-semibold">— Maria P.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call To Action */}
          <section className="p-6 text-center md:p-12">
            <div className="bg-primary rounded-2xl p-10 text-white shadow-md">
              <h2 className="mb-4 text-3xl font-bold">
                Ready to Start Learning?
              </h2>
              <p className="mb-6">
                Join thousands of learners already building their future.
              </p>
              <Button
                size="lg"
                className="text-primary bg-white hover:bg-gray-100"
              >
                Join Now
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;

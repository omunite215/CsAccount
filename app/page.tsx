import {
  CompanyInfo,
  ShareCapital,
  ShareParticulars,
  Shareholders,
  Directors,
  CompanySecretary,
} from "@/components/Forms";
import { Popup } from "@/components/Popup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="md:container w-full py-6 md:px-0 px-6">
      <Tabs defaultValue="CI">
        <TabsList className="grid w-full md:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:mb-0 mb-40">
          <TabsTrigger value="CI">Company Info</TabsTrigger>
          <TabsTrigger value="SI">Shares Info</TabsTrigger>
          <TabsTrigger value="D">Directors</TabsTrigger>
          <TabsTrigger value="CS">Company Secretary</TabsTrigger>
        </TabsList>
        <TabsContent value="CI">
          <Popup />
          <CompanyInfo />
        </TabsContent>
        <TabsContent value="SI" className="flex flex-col gap-3">
          <ShareCapital />
          <Shareholders />
          <ShareParticulars />
        </TabsContent>
        <TabsContent value="D">
          <Directors />
        </TabsContent>
        <TabsContent value="CS">
          <CompanySecretary />
        </TabsContent>
      </Tabs>
      <p className="mt-4">
        Copyright © 2012 - 2024 ComSec360®. All rights reserved.
      </p>
    </main>
  );
}

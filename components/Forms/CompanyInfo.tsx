"use client";

import { CompanyInfoFormSchema } from "@/app/validationSchemas";
import { Check, ChevronsUpDown } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HoverCardComponent } from "@/components/HoverCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDataContext } from "@/context/ContextProvider";
import {
  CompanyInfoHoverContent,
  NatureOfBusinessContent,
} from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useState } from "react";
const CompanyInfo = () => {
  const { setTabValue, setDisableSI } = useDataContext();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof CompanyInfoFormSchema>>({
    resolver: zodResolver(CompanyInfoFormSchema),
    defaultValues: {
      name: "",
      chiname: "",
      code: "",
      nature: "",
      type: "private",
      house: "",
      building: "",
      street: "",
      district: "",
      country: "Hong Kong",
      email: "",
      companyTel: "",
      companyfax: "",
      time: "1 year",
      presentorName: "",
      presentorChiName: "",
      presentorAddress: "",
      presentorTel: "",
      presentorFax: "",
      presentorEmail: "",
      presentorReferance: "CompanyName-NNC1-06-03-2024",
    },
  });

  // Submit Handler.
  function onSubmit(values: z.infer<typeof CompanyInfoFormSchema>) {
    console.log(values);
    setDisableSI(false);
    setTabValue("SI");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Info</CardTitle>
        <CardDescription>Enter information about your Company</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="inline-flex items-center gap-2">
                      <span>Company Name (English):</span>
                      <HoverCardComponent
                        content={
                          <ol className="space-y-3 list-[lower-alpha] *:leading-relaxed px-2 py-2">
                            <li>{CompanyInfoHoverContent.name.first}</li>
                            <li>{CompanyInfoHoverContent.name.second}</li>
                          </ol>
                        }
                        size={20}
                      />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="company name (English)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="chiname"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name (Chinese):</FormLabel>
                    <FormControl>
                      <Input placeholder="company name (Chinese)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="inline-flex items-center gap-2">
                      <span>Select Type of Company:</span>
                      <HoverCardComponent
                        content={
                          <span className=" leading-relaxed">
                            {CompanyInfoHoverContent.type}
                          </span>
                        }
                        size={20}
                      />
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex justify-start items-center gap-10"
                      >
                        <FormItem className="flex items-end space-x-3">
                          <FormControl>
                            <RadioGroupItem value="private" />
                          </FormControl>
                          <FormLabel className="font-normal">Private</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-end space-x-3">
                          <FormControl>
                            <RadioGroupItem value="public" disabled />
                          </FormControl>
                          <FormLabel className="font-normal text-muted-foreground">
                            Public
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 items-center">
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code:</FormLabel>
                      <FormControl>
                        <Input placeholder="XXX" {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="nature"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Nature of Business</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "md:w-[450px] w-auto h-auto justify-between text-wrap",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? field.value
                                : " Select Nature of Business"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="md:w-[450px] w-auto">
                          <Command>
                            <CommandInput placeholder="Search Nature of Business..." />
                            <CommandList>
                              <CommandEmpty>No results found.</CommandEmpty>
                              {NatureOfBusinessContent.map((item) => (
                                <div key={item.categoryName}>
                                  <CommandGroup
                                    heading={item.categoryName}
                                    key={item.categoryName}
                                  
                                  >
                                    {item.content.map((subItem) => (
                                      <CommandItem
                                        value={subItem.value}
                                        key={subItem.code}
                                        className="text-left"
                                        onSelect={() => {
                                          form.setValue(
                                            "nature",
                                            subItem.value
                                          );
                                          form.setValue("code", subItem.code);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 w-4 h-4",
                                            subItem.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {subItem.value}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                  <CommandSeparator />
                                </div>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-3">
              <FormField
                name="house"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="inline-flex items-center gap-2">
                      <span>Address: </span>
                      <HoverCardComponent
                        content={
                          <span className=" leading-relaxed">
                            {CompanyInfoHoverContent.address}
                          </span>
                        }
                        size={20}
                      />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Flat / Floor / Block" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="building"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Building" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="street"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="district"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="District" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="country"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="HongKong" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company E-mail:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="info@test1.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                name="companyTel"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Telephone:</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter a phone number"
                        defaultCountry="HK"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="companyfax"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Fax No:</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter a phone number"
                        defaultCountry="HK"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="time"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" inline-flex items-center gap-2">
                    <span>
                      Choose how long period of Business Registration Fee:
                    </span>
                    <HoverCardComponent
                      content={
                        <span className=" leading-relaxed">
                          {CompanyInfoHoverContent.time}
                        </span>
                      }
                      size={20}
                    />
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex justify-start items-center gap-10"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1 year" />
                        </FormControl>
                        <FormLabel className="font-normal">1 Year</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="3 years" />
                        </FormControl>
                        <FormLabel className="font-normal">3 Years</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Card>
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2">
                  <span>Presentor&lsquo;s Referance</span>
                  <HoverCardComponent
                    content={
                      <span className=" font-normal leading-relaxed text-base">
                        {CompanyInfoHoverContent.presentor}
                      </span>
                    }
                    size={28}
                  />
                </CardTitle>
                <CardDescription>
                  Please enter info on Presentor&lsquo;s Referance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    name="presentorName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (English):</FormLabel>
                        <FormControl>
                          <Input placeholder="James Bond" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="presentorChiName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (Chinese):</FormLabel>
                        <FormControl>
                          <Input placeholder="Name (Chinese)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="presentorAddress"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg: 16, Taichi Street..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    name="presentorTel"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telephone:</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder="Enter a phone number"
                            defaultCountry="HK"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="presentorFax"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fax No:</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder="Enter a phone number"
                            defaultCountry="HK"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="presentorEmail"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="info@test1.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="presentorReferance"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Presentor&lsquo;s Referance:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg: CompanyName-NNC1-06-03-2024"
                          {...field}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <div className="flex justify-end items-center">
              <Button type="submit" variant="destructive">
                Save & Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompanyInfo;

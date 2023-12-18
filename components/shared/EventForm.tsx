"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import Dropdown from "@/components/shared/Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/shared/FileUploader";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username Must be at least 2 characters",
  }),
});
type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
};
const EventForm = ({ userId, type }: EventFormProps) => {
  const initialValues = eventFormSchema;
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const [files, setFiles] = useState<FieldArray>([]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col ga-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl className="h-72"></FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default EventForm;

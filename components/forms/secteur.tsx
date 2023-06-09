"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SECTEUR } from "@/types/schema";
import { IResponseRO } from "@/lib/services";
import { getUrlBase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/react-hook-form/form";

const URL_BASE = getUrlBase();

const formSchema = z.object({
  codesecteur: z
    .string()
    .min(2, { message: "Veuillez saisir au moins 1 charactères." })
    .max(10, { message: "Le code ne doit pas dépasser 10 charactères." }),
  libsecteur: z
    .string()
    .min(2, { message: "Veuillez saisir le libellé." })
    .max(50, { message: "Le nom ne doit pas dépasser 50 charactères." }),
  ordreaff: z.string().regex(/\d{1,10}/, {
    message: "Veuillez saisir une valeur numérique (max 10 chiffres)"
  })
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  codesecteur: "",
  libsecteur: "",
  ordreaff: ""
};

export default function SecteurForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  const {
    formState: { isSubmitting }
  } = form;

  async function onSubmit(data: FormValues) {
    const payload: SECTEUR = {
      ...data,
      ordreaff: Number(data.ordreaff),
      creaqui: "TODO"
    };

    const response = await fetch(`${URL_BASE}/api/utilisateurs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result: IResponseRO = await response.json();
    if (result.status !== "900") {
      form.reset();
      router.replace("/");

      toast({
        title: "Création secteur:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{"Le secteur a été créé"}</code>
          </pre>
        )
      });
    } else {
      toast({
        title: "L'erreur suivante est survenue:",
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-white">{result.errorMessage.split(":")[1]}</p>
          </div>
        )
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 flex flex-col align-center"
      >
        <FormField
          control={form.control}
          name="codesecteur"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code secteur</FormLabel>
              <FormControl>
                <Input
                  placeholder="Code secteur"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="libsecteur"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Libellé secteur</FormLabel>
              <FormControl>
                <Input placeholder="Libellé secteur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ordreaff"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ordre affichage</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ordre affichage"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="self-center" type="submit" disabled={isSubmitting}>
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}
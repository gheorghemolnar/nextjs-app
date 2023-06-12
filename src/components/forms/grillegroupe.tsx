"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { GRILLE_GROUPE } from "@/types/schema";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

const URL_BASE = getUrlBase();

const formSchema = z.object({
  codegrillegr: z
    .string()
    .min(1, { message: "Veuillez saisir au moins 1 charactères." })
    .max(20, { message: "Le code ne doit pas dépasser 20 charactères." }),
  typegrille: z
    .string()
    .min(1, { message: "Veuillez saisir le type de grille." }),
  libctrl: z
    .string()
    .min(3, { message: "Veuillez saisir le libellé." })
    .max(500, { message: "Le nom ne doit pas dépasser 500 charactères." }),

  descctrl: z
    .string()
    .min(3, { message: "Veuillez saisir le descriptif." })
    .max(500, {
      message: "Le descriptif ne doit pas dépasser 500 charactères."
    })
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  codegrillegr: "",
  typegrille: "",
  libctrl: "",
  descctrl: ""
};

export default function GrilleGroupeForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  const {
    formState: { isSubmitting }
  } = form;

  async function onSubmit(data: FormValues) {
    const payload: GRILLE_GROUPE = {
      ...data,
      creaqui: "TODO"
    };

    const response = await fetch(`${URL_BASE}/api/grillegroupe`, {
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
        title: "Création grille groupe:",
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
          name="codegrillegr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code grille groupe</FormLabel>
              <FormControl>
                <Input
                  placeholder="Code grille groupe"
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
          name="typegrille"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type grille</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Séléctionnez le type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="M">Matière</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="libctrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Libellé contrôle</FormLabel>
              <FormControl>
                <Input placeholder="Libellé contrôle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descctrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Decriptif contrôle</FormLabel>
              <FormControl>
                <Input placeholder="Decriptif contrôle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="self-center " type="submit" disabled={isSubmitting}>
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}

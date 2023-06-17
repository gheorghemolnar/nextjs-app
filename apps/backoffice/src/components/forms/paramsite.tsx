

import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { PARAMSITE } from "@/types/schema";
import { IResponseRO } from "@/lib/services";
import { getUrlBase } from "@backoffice/lib/utils";
import { Button, Input, toast } from "@big/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm
} from "@big/forms";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@big//ui";

const URL_BASE = getUrlBase();

const formSchema = z.object({
  idsite: z.string().min(1, { message: "Veuillez séléctionnez le site." }),
  idatelier: z
    .string()
    .min(1, { message: "Veuillez séléctionnez l'atelier'." }),
  idsecteur: z.string().min(1, { message: "Veuillez séléctionnez le secteur." })
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  idsite: "",
  idatelier: "",
  idsecteur: ""
};

export default function ParamSiteForm() {
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  const {
    formState: { isSubmitting }
  } = form;

  async function onSubmit(data: FormValues) {
    const payload: PARAMSITE = {
      ...data,
      idsite: Number(data.idsite),
      idatelier: Number(data.idatelier),
      idsecteur: Number(data.idsecteur),
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
      navigate("/")

      toast({
        title: "Création param site:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{"Le param site a été créé"}</code>
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
          name="idsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Séléctionnez le site" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Quimperlé</SelectItem>
                  <SelectItem value="2">Castres</SelectItem>
                  <SelectItem value="3">Evron</SelectItem>
                  <SelectItem value="4">Cherré</SelectItem>
                  <SelectItem value="5">Anglet</SelectItem>
                  <SelectItem value="6">Cholet</SelectItem>
                  <SelectItem value="7">Le Neubourg</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idsecteur"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secteur</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Séléctionnez le secteur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1ère transformation Boeuf</SelectItem>
                  <SelectItem value="2">2ème transformation Boeuf</SelectItem>
                  <SelectItem value="3">1ère transformation Porc</SelectItem>
                  <SelectItem value="4">2ème transformation Porc</SelectItem>
                  <SelectItem value="5">3ème transformation</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idatelier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Atelier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Séléctionnez l'atelier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Chaine d'abattage</SelectItem>
                  <SelectItem value="2">Abat Rouge</SelectItem>
                  <SelectItem value="3">Abat Blanc</SelectItem>
                  <SelectItem value="4">Mise en quartier</SelectItem>
                  <SelectItem value="5">Casse AR</SelectItem>
                  <SelectItem value="6">Désossage AR</SelectItem>
                  <SelectItem value="7">Parage AR</SelectItem>
                  <SelectItem value="8">Casse AV</SelectItem>
                  <SelectItem value="9">Désossage AV</SelectItem>
                  <SelectItem value="10">Parage AV</SelectItem>
                  <SelectItem value="11">Préparation Carcasse</SelectItem>
                  <SelectItem value="12">D1</SelectItem>
                  <SelectItem value="13">D2 - Jambon</SelectItem>
                  <SelectItem value="14">D2 - Poitrine</SelectItem>
                  <SelectItem value="15">D2 - Carré</SelectItem>
                  <SelectItem value="16">D2 - Pointe</SelectItem>
                  <SelectItem value="17">D2 - Echine</SelectItem>
                  <SelectItem value="18">Eviscération</SelectItem>
                  <SelectItem value="19">Boyauderie</SelectItem>
                  <SelectItem value="20">Conditionnement</SelectItem>
                  <SelectItem value="21">D2 - Epaule</SelectItem>
                </SelectContent>
              </Select>
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

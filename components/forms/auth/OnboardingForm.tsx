"use client";

import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { SelectField } from "@/components/ui/SelectField";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import {
  useCreateIntegration,
  useDataMasterUpload,
  useIntegration,
} from "@/hooks/useIntegration";
import { getErrorMessage } from "@/lib/error";
import { useRouter } from "next/navigation";

const STOREFRONT_PLATFORMS = [
  { label: "Shopify", value: "shopify" },
  { label: "WooCommerce", value: "woocommerce" },
  { label: "BigCommerce", value: "bigcommerce" },
  { label: "Magento", value: "magento" },
  { label: "Custom / Other", value: "other" },
];

export interface OnboardingFormValues {
  storefrontPlatform: string;
  existingStorefrontWebhook: string;
  financingProvider: string;
  financingWebhookAvailable: boolean;
  financingWebhookUrl?: string;
  factorySchedulingUrl: string;
  inventoryWebhookUrl: string;
  dataMasterSheet: string;
  dataMasterSheetFile?: File;
}

export function OnboardingForm() {
  const [uploadError, setUploadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      storefrontPlatform: "",
      existingStorefrontWebhook: "",
      financingProvider: "",
      financingWebhookAvailable: false,
      financingWebhookUrl: "",
      factorySchedulingUrl: "",
      inventoryWebhookUrl: "",
      dataMasterSheet: "",
    },
  });

  const { control, watch, reset, setValue } = methods;

  const financingWebhookAvailable = watch("financingWebhookAvailable");
  const integrationQuery = useIntegration();
  const createIntegrationMutation = useCreateIntegration();
  const uploadMutation = useDataMasterUpload();

  useEffect(() => {
    if (!integrationQuery.data) return;

    const integration = integrationQuery.data;

    reset({
      storefrontPlatform: integration.storefront_platform || "",
      existingStorefrontWebhook: integration.storefront_webhook_url || "",
      financingProvider: integration.financing_provider || "",
      financingWebhookAvailable: integration.financing_webhook_enabled,
      financingWebhookUrl: integration.financing_webhook_enabled
        ? integration.storefront_webhook_url
        : "",

      factorySchedulingUrl: integration.factory_webhook_url || "",
      inventoryWebhookUrl: integration.inventory_webhook_url || "",
      dataMasterSheet:
        integration.data_master_url || integration.data_master_file_path || "",
    });
  }, [integrationQuery.data, reset]);

  const handleDataMasterUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploadError("");

    try {
      setValue("dataMasterSheetFile", file);

      const response = await uploadMutation.mutateAsync(file);

      setValue("dataMasterSheet", response.url);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      setUploadError(errorMessage);
      console.log("Upload failed:", errorMessage);
    }
  };

  const onSubmit = async (data: OnboardingFormValues) => {
    try {
      setSubmitError("");

      await createIntegrationMutation.mutateAsync({
        storefront_platform: data.storefrontPlatform,
        storefront_webhook_url: data.existingStorefrontWebhook,
        financing_provider: data.financingProvider,
        financing_webhook_enabled: data.financingWebhookAvailable,
        financing_webhook_url: data.financingWebhookUrl,
        factory_webhook_url: data.factorySchedulingUrl,
        inventory_webhook_url: data.inventoryWebhookUrl,
        data_master_url: data.dataMasterSheet,
      });
      setCompleted(true);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      setSubmitError(errorMessage);

      console.log("Integration save failed:", errorMessage);
    }
  };

  if (completed) {
    return (
      <div className="min-h-[60vh]  flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Integration Configured
          </h2>

        

          <p className="text-sm leading-6 text-slate-500 mb-8">
            Your middleware integration details have been recorded. Your Ops
            Pipeline is ready.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/")}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Go to Ops Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 mb-2">
              Step 1 of 1 — Integration Setup
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Connect Your Stack
            </h1>

            <p className="text-[14px] text-slate-500">
              Configure your storefront, financing, and factory integrations so
              Peppasync can begin routing orders automatically
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold pb-3 mb-6 border-b">
              Storefront
            </h2>

            <section className="space-y-1">
              <h2 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                Storefront Platform
              </h2>

              <SelectField
                name="storefrontPlatform"
                label="Storefront Platform"
                options={STOREFRONT_PLATFORMS}
              />
            </section>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                Existing Storefront Webhook URL
              </label>
              <InputField
                label=""
                name="existingStorefrontWebhook"
                placeholder="https://hooks.your-storefront.com/orders"
                helperText="The endpoint Peppasync will listen to for new order events."
              />
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[11px]  uppercase tracking-widest text-slate-400 font-semibold pb-3 mb-6 border-b">
              Financing
            </h2>
            <section className="space-y-1">
              <h2 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                Financing Provider
              </h2>
              <InputField
                name="financingProvider"
                label=""
                placeholder="e.g. V12 Finance, Klarna, Divido"
              />
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                Financing Provider Webhook Available?
              </h2>

              <Controller
                name="financingWebhookAvailable"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    label={
                      field.value
                        ? "Yes — webhook available"
                        : "No — manual or API polling"
                    }
                  />
                )}
              />

              {financingWebhookAvailable && (
                <section className="space-y-1 mt-3">
                  <h2 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                    Financing Webhook URL
                  </h2>

                  <InputField
                    name="financingWebhookUrl"
                    label=""
                    placeholder="https://api.finance.com/webhook"
                  />
                </section>
              )}
            </section>
          </section>

          <section className="space-y-5">
            <h2 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold pb-3 mb-6 border-b">
              Factory & Inventory
            </h2>

            <section className="space-y-1">
              <h2 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                Factory Scheduling API / Webhook URL
              </h2>
              <div className="space-y-1">
                <InputField
                  name="factorySchedulingUrl"
                  label=""
                  placeholder="https://factory.yourco.com/api/schedule"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Where Peppasync pushes confirmed design-freeze orders.
                </p>
              </div>
            </section>

            <section className="space-y-1">
              <h2 className="text-[11px]  uppercase tracking-widest text-slate-400 font-semibold">
                Inventory Platform Webhook URL
              </h2>
              <div className="space-y-1">
                <InputField
                  name="inventoryWebhookUrl"
                  label=""
                  placeholder="https://inventory.yourco.com/webhook"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Used for live BOM availability checks.
                </p>
              </div>
            </section>
          </section>

          <section className="space-y-5">
            <h2 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold pb-3 mb-6 border-b">
              Data Master
            </h2>

            <section className="space-y-1">
              <h2 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                Data Master Sheet (URL or File)
              </h2>

              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <InputField
                      name="dataMasterSheet"
                      label=""
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                    />
                  </div>

                  <div className="mt-1">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".xlsx,.xls,.csv,.gsheet"
                      onChange={handleDataMasterUpload}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 px-4 text-sm font-medium border-gray-300 hover:bg-transparent"
                      disabled={uploadMutation.isPending}
                      onClick={() => {
                        document.getElementById("file-upload")?.click();
                      }}
                    >
                      <Upload className="h-3.5 w-3.5" strokeWidth={1.75} />

                      {uploadMutation.isPending ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-1">
                  Link to a Google Sheet, Excel export URL, or paste a direct
                  file URL.
                </p>

                {uploadError && (
                  <p className="text-sm text-red-500">{uploadError}</p>
                )}
              </div>
            </section>
          </section>

          {submitError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <section className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={createIntegrationMutation.isPending}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white text-[14px] font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              {createIntegrationMutation.isPending
                ? "Saving..."
                : integrationQuery.data
                  ? "Update Integration"
                  : "Save Integration & Continue"}

              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-sm text-slate-400">
              You can update these settings anytime from the Settings page.
            </p>
          </section>
        </form>
      </FormProvider>
    </main>
  );
}

"use client";

import { FormProvider, useForm, Controller } from "react-hook-form";
import { ArrowRight, Upload } from "lucide-react";
import { SelectField } from "@/components/ui/SelectField";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";

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

  factorySchedulingUrl: string;
  inventoryWebhookUrl: string;
  dataMasterSheet: string;
  dataMasterSheetFile?: File;
}

export function OnboardingForm({
  onSubmit,
}: {
  onSubmit: (data: OnboardingFormValues) => void;
}) {
  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      storefrontPlatform: "",
      existingStorefrontWebhook: "",
      financingProvider: "",
      financingWebhookAvailable: false,
      factorySchedulingUrl: "",
      inventoryWebhookUrl: "",
      dataMasterSheet: "",
    },
  });

  const { control, watch } = methods;
  const financingWebhookAvailable = watch("financingWebhookAvailable");

  return (
    <main>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 mb-2">
              Step 1 of 1 — New Integration
            </p>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Connect Your Stack
            </h1>
            <p className="text-[14px] text-slate-500">
              Configure your storefront, financing, and factory integrations so
              Peppasync can begin routing orders automatically.
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
                    <Controller
                      name="dataMasterSheetFile"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept=".xlsx,.xls,.csv,.gsheet"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // Upload file logic here
                                const formData = new FormData();
                                formData.append("file", file);

                                try {
                                  methods.setValue(
                                    "dataMasterSheet",
                                    file.name,
                                  );
                                } catch (error) {
                                  console.error("Upload failed:", error);
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="h-10 px-4 text-sm font-medium border-gray-300 hover:bg-transparent"
                            onClick={() => {
                              document.getElementById("file-upload")?.click();
                            }}
                          >
                            <Upload
                              className="h-3.5 w-3.5"
                              strokeWidth={1.75}
                            />
                            Upload
                          </Button>
                        </>
                      )}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Link to a Google Sheet, Excel export URL, or paste a direct
                  file URL.
                </p>
              </div>
            </section>
          </section>

          <section className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white text-[14px] font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              Save Integration & Continue →
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

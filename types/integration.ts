// ============================================
// FILE: src/types/integration.ts
// ============================================

export interface Integration {
  id: string;
  user_id: string;

  storefront_platform: string;
  storefront_webhook_url: string;

  financing_provider: string;
  financing_webhook_enabled: boolean;

  factory_webhook_enabled: boolean;
  factory_webhook_url: string;

  inventory_webhook_enabled: boolean;
  inventory_webhook_url: string;

  data_master_enabled: boolean;
  data_master_url: string;
  data_master_file_path: string;

  created_at: string;
  updated_at: string;
}

export interface CreateIntegrationPayload {
  storefront_platform: string;
  storefront_webhook_url: string;
  financing_provider: string;
  financing_webhook_enabled: boolean;
  financing_webhook_url?: string;
  factory_webhook_url: string;
  inventory_webhook_url: string;
  data_master_url?: string;
}


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
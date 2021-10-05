#!/bin/bash
export ARM_CLIENT_ID=$(az keyvault secret show --vault-name bdmDevDPSKeyVault --name bdm-dev-terraform-sp-id --query value -otsv) 
export ARM_CLIENT_SECRET=$(az keyvault secret show --vault-name bdmDevDPSKeyVault --name bdm-dev-terraform-sp-pass --query value -otsv) 
export ARM_SUBSCRIPTION_ID=$(az keyvault secret show --vault-name bdmDevDPSKeyVault --name bdm-dev-subscription-id --query value -otsv) 
export ARM_TENANT_ID=$(az keyvault secret show --vault-name bdmDevDPSKeyVault --name bdm-dev-tenant-id --query value -otsv) 
export TF_VAR_luis_instance_name="oas-unlock-bot-bdm-dev"
export TF_VAR_luis_authoring_instance_name="oas-unlock-bot-authoring-bdm-dev"
export TF_VAR_luis_sku_name="S0"
export TF_VAR_location="westus"
export TF_VAR_resource_group_name="oas-unlock-bot-bdm-dev"
provider "azurerm" {
  subscription_id = var.subscription_id
  tenant_id = var.tenant_id
  client_id = var.client_id
  client_secret = var.client_secret
  features {}
}

terraform {

  backend "azurerm" {
    resource_group_name  = var.dps_tf_store_rg
    storage_account_name = var.dps_storage_account_name
    container_name       = var.luis_instance_name
    key                  = "terraform.tfstate"
  }  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.78"
    }
  }
}
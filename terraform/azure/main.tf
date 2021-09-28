
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.78"
    }
  }

provider "azurerm" {
features {}
subscription_id = var.subscription_id
tenant_id = var.tenant_id
client_id = var.client_id
client_secret = var.client_secret
}

resource "azurerm_resource_group" "oas_callback_luis" {
  name     = var.resource_group_name # please provide the value
  location = var.location
}

#LUIS
resource "azurerm_cognitive_account" "luis_oas_callback" {
  name                =var.luis_instance_name  # please provide the value
  location            = azurerm_resource_group.oas_callback_luis.location # not sure if this value need to change
  resource_group_name = var.resource_group_name
  kind                = "LUIS"

  sku_name = var.sku_name
  tags = {
"Environment" = "Dev"
"CostCenter" = "ML/AI"
}
}

resource "azurerm_cognitive_account" "luis_authoring_oas_callback" {
  name                = "${var.luis_instance_name}"  # please provide the value
  location            = azurerm_resource_group.oas_callback_luis.location # not sure if this value need to change
  resource_group_name = var.resource_group_name # not sure if this value need to change
  kind                = "LUIS.Authoring"

  sku_name = var.sku_name
}
}




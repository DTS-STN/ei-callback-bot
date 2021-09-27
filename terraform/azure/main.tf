
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.78"
    }
  }

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "oas_callback_luis" {
  name     = "oas_callback_luis_rg" # please provide the value
  location = "East US" # please provide the value
}

#LUIS
resource "azurerm_cognitive_account" "luis_oas_callback" {
  name                ="${var.luis_instance_name}"  # please provide the value
  location            = var.luis_location # not sure if this value need to change
  resource_group_name = azurerm_resource_group.oas_callback_luis.name
  kind                = "LUIS"

  sku_name = "S0"
  tags = {
"Environment" = "Dev"
"CostCenter" = "ML/AI"
}
}

resource "azurerm_cognitive_account" "luis_authoring_oas_callback" {
  name                = "${var.luis_instance_name}"  # please provide the value
  location            = var.luis_location # not sure if this value need to change
  resource_group_name = azurerm_resource_group.rg.name # not sure if this value need to change
  kind                = "LUIS.Authoring"

  sku_name = "F0"
}
}




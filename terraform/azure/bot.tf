data "azurerm_client_config" "current" {}

data "azurerm_subscription" "primary" {}

resource "azurerm_bot_channels_registration" "oas_callback_bot" {
  name                = "oas_callback_bot"
  location            = "global"
  resource_group_name = var.resource_group_name
  sku                 = "F0"
  microsoft_app_id    = "${data.azurerm_client_config.current.client_id}"
}

resource "azurerm_role_assignment" "oas-callback-bot" {
  scope                = data.azurerm_subscription.primary.id
  role_definition_name = "Contributor"
  principal_id         = data.azurerm_client_config.current.object_id
}
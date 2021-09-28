output "luis_authoring_endpoint" {
  value = azurerm_cognitive_account.luis_authoring.endpoint
}

output "luis_authoring_key" {
  value = azurerm_cognitive_account.luis_authoring.primary_access_key
}
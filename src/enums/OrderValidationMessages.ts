export enum OrderValidationMessages {
    STATUS_REQUIRED = "Order status is required",
    USERNAME_TOO_SHORT = "Username is too short (minimum 3 signs)",
    USERNAME_TOO_LONG = "Username is too long (maximum 20 signs)",
    USERNAME_REQUIRED = "Username is required",
    EMAIL_REQUIRED = "E-mail is required",
    EMAIL_WRONG_SYNTAX = "E-mail's syntax is wrong",
    PHONE_NUMBER_REQUIRED = "Phone number is required",
    PHONE_NUMBER_LENGTH = "Phone number must be 9 digit",
    ORDERED_PRODUCT_REQUIRED = "Ordered product's are required"
}
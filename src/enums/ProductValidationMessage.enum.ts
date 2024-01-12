export enum ProductValidationMessages {
    NAME_TOO_SHORT = "Name is too short (minimum 3 signs)",
    NAME_TOO_LONG = "Name is too long (maximum 20 signs)",
    NAME_REQUIRED = "Name is required",
    PRICE_NEGATIVE = "Price has to be over 0.01",
    PRICE_REQUIRED = "Price is required",
    WEIGHT_NEGATIVE = "Unit weight has to be over 0.1",
    WEIGHT_REQUIRED = "Unit weight is required",
    PRODUCT_TYPE_REQUIRED = "Product type is required",
}
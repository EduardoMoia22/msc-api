import { PaymentMethod } from "src/entities/payment-method.entity";
import { PaymentMethod as RawPaymentMethod } from "@prisma/client";
import { PaymentMethodRequestDTO, PaymentMethodResponseDTO } from "src/DTOs/payment-methods.dtos";

export class PaymentMethodMapper {
    // Maps Prisma data to the PaymentMethod entity
    public static prismaToEntity(data: RawPaymentMethod): PaymentMethod {
        return new PaymentMethod(data.id, data.name);
    }

    // Maps the PaymentMethod entity to Prisma format, excluding the id
    public static entityToPrisma(data: PaymentMethod): Omit<RawPaymentMethod, "id"> {
        return {
            name: data.getName,
        };
    }

    // Maps the PaymentMethodRequestDTO to a PaymentMethod entity
    public static dtoToEntity(data: PaymentMethodRequestDTO): PaymentMethod {
        return new PaymentMethod(0, data.name); // Assuming ID is handled elsewhere
    }

    // Maps the PaymentMethod entity to a PaymentMethodResponseDTO
    public static entityToResponseDto(data: PaymentMethod): PaymentMethodResponseDTO {
        return new PaymentMethodResponseDTO(data.getId, data.getName);
    }
}

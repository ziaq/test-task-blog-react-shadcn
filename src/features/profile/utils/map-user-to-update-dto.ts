import { UserResponseDto } from "../dto/user-response.schema"
import { UpdateUserDto } from "../dto/update-user.schema"

export function mapUserToUpdateDto(user: UserResponseDto): UpdateUserDto {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone ?? undefined,
    birthDate: user.birthDate ?? undefined,
    about: user.about ?? undefined,
  }
}
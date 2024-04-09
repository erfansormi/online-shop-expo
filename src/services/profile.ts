import axiosInstance from "@/libs/axios"
import { ChangeEmailData, ChangeNameData } from "@/utils/schemas"

export const editName = (data: ChangeNameData) => {
    return axiosInstance.put("/api/v1/users/edit-name", data)
}

export const editEmail = (data: ChangeEmailData) => {
    return axiosInstance.put("/api/v1/users/edit-email", data)
}

export const editPassword = (data: { current_password: string, new_password: string }) => {
    return axiosInstance.put("/api/v1/users/edit-password", data)
}
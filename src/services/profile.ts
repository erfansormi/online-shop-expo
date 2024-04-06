import axiosInstance from "@/libs/axios"
import { ChangeNameData } from "@/utils/schemas"

export const editName = (data: ChangeNameData) => {
    return axiosInstance.put("/api/v1/users/edit-name", data)
}
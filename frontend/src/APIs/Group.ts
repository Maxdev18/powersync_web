import Axios from "axios";
import { Response } from "../Types/Response";
import { Group } from "../Types/Group";

export class GroupAPI {
  static async updateGroup(group: Group): Promise<Response> {
    return Axios.put("/api/v1/groups/update-group", { group })
      .then(data => {
        return { message: "Updated group", isError: false, data: data.data.group }
      })
      .catch(error => {
        console.error(error)
        return { message: "Unable to update group", isError: true }
      })
  }

  static async deleteGroup(groupId: string): Promise<Response> {
    return Axios.delete("/api/v1/groups/delete-group", {
      params: { groupId }
    })
      .then(data => {
        return { message: "Deleted group", isError: false, data: data.data.group }
      })
      .catch(error => {
        console.error(error)
        return { message: "Unable to delete group", isError: true }
      })
  }

  static async getGroup(groupId: string): Promise<Response> {
    return Axios.get("/api/v1/groups/get-group", {
      params: { groupId }
    })
      .then(data => {
        return { message: "Got group", isError: false, data: data.data.group }
      })
      .catch(error => {
        console.error(error)
        return { message: "Unable to get group", isError: true }
      })
  }

  static async getAllGroups(userId: string): Promise<Response> {
    return Axios.get("/api/v1/groups/get-all-groups", {
      params: { userId }
    })
      .then(data => {
        localStorage.setItem("groups", JSON.stringify(data.data.groups || []))
        return { message: "Got all groups", isError: false, data: data.data.groups }
      })
      .catch(error => {
        console.error(error)
        return { message: "Unable to get all groups", isError: true }
      })
  }

  static async createGroup(group: Group): Promise<Response> {
    return Axios.post("/api/v1/groups/create-group", group)
      .then(data => {
        return { message: "Created group", isError: false, data: data.data.group }
      })
      .catch(error => {
        console.error(error)
        return { message: "Unable to create group", isError: true }
      })
  }
}
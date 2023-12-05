import { dataApi } from "../../../api";


    export const fetchDeparment = async () => {
      const {data} = await dataApi.get<any>("/localities/departments");
      return data.departments
    }    


    export const fetchCity = async (cityid:any) => {
        const {data} = await dataApi.get<any>(`/localities/cities-by-department/${cityid}`);
        return data.cities
    }

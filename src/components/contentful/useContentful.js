import { createClient } from "contentful";

const useContentful = () => {
    const client = createClient({
        space: "sof4v5jsgktw",
        accessToken: "Pe9T3Hw1gE9OU4260DoG2PLtFqoJiZm-eAJPkWDmn18",
        host: "preview.contentful.com"
    });

    const getCategories = async () => {
        try {
            const entries = await client.getEntries({
                content_type: "categories",
                select: "fields",
            })

            const sanitizedEntries = entries.items.map((item) => {
                const avatar = item.fields.avatar.fields;

                return {
                    ...item.fields,
                    avatar
                }
            })

            return sanitizedEntries
        } catch (error) {
            console.log(`Error fecthing categories: ${error}`);
        }
    }

    const getStudentProfile = async () => {
        try {
            const sp_entries = await client.getEntries({
                content_type: "studentProfile",
                select: "fields",
            })

            const sp_sanitizedEntries = sp_entries.items.map((item) => {
                const sp_avatar = item.fields.avatar.fields;

                return {
                    ...item.fields,
                    sp_avatar
                }
            })

            return sp_sanitizedEntries
        } catch (error) {
            console.log(`Error fecthing studentProfile: ${error}`);
        }
    }


    const getPersonalInfo = async () => {
        try {
            const pi_entries = await client.getEntries({
                content_type: "personalInfo",
                select: "fields",
            })

            const pi_sanitizedEntries = pi_entries.items.map((item) => {
                const pi_avatar = item.fields.avatar?.fields;

                return {
                    ...item.fields,
                    pi_avatar
                }
            })

            return pi_sanitizedEntries
        } catch (error) {
            console.log(`Error fetching categories: ${error}`);
        }
    }
    const getEmployeeServices = async () => {
        try {
            const es_entries = await client.getEntries({
                content_type: "employeeServices",
                select: "fields",
            })

            const es_sanitizedEntries = es_entries.items.map((item) => {
                const es_avatar = item.fields.avatar?.fields;

                return {
                    ...item.fields,
                    es_avatar
                }
            })

            return es_sanitizedEntries
        } catch (error) {
            console.log(`Error fetching categories: ${error}`);
        }
    }

    const getStudentServices = async () => {
        try {
            const ss_entries = await client.getEntries({
                content_type: "studentServices",
                select: "fields",
            })

            const ss_sanitizedEntries = ss_entries.items.map((item) => {
                const ss_avatar = item.fields.avatar?.fields;

                return {
                    ...item.fields,
                    ss_avatar
                }
            })

            return ss_sanitizedEntries
        } catch (error) {
            console.log(`Error fetching categories: ${error}`);
        }
    }
    const getFinancialAid = async () => {
        try {
            const fa_entries = await client.getEntries({
                content_type: "financialAid",
                select: "fields",
            })

            const fa_sanitizedEntries = fa_entries.items.map((item) => {
                const fa_avatar = item.fields.avatar?.fields;

                return {
                    ...item.fields,
                    fa_avatar
                }
            })

            return fa_sanitizedEntries
        } catch (error) {
            console.log(`Error fetching categories: ${error}`);
        }
    }
    const getRegistration = async () => {
        try {
            const re_entries = await client.getEntries({
                content_type: "registration",
                select: "fields",
            })

            const re_sanitizedEntries = re_entries.items.map((item) => {
                const re_avatar = item.fields.avatar?.fields;

                return {
                    ...item.fields,
                    re_avatar
                }
            })

            return re_sanitizedEntries
        } catch (error) {
            console.log(`Error fetching categories: ${error}`);
        }
    }
    const getRegPlan = async () => {
        try {
            const regplan_entries = await client.getEntries({
                content_type: "registerPlan",
                select: "fields",
            })

            const regplan_sanitizedEntries = regplan_entries.items.map((item) => {
                const regplan_avatar = item.fields.avatar.fields;

                return {
                    ...item.fields,
                    regplan_avatar
                }
            })

            return regplan_sanitizedEntries
        } catch (error) {
            console.log(`Error fetching categories: ${error}`);
        }
    }

    return { getCategories, getPersonalInfo, getEmployeeServices, getStudentServices, getFinancialAid, getRegistration, getRegPlan, getStudentProfile }




};

export default useContentful;
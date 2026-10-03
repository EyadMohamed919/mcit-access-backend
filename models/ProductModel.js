const db = require("../config/db");

async function getAllProductsByProjectID(pr_ID) {
    try {
        const sql = `SELECT * FROM Products WHERE pr_id = ${Number(pr_ID)}`;
        const products = await db.query(sql);
        return products;
    } catch (error) {
        console.error("Error in getAllProductsByProjectID:", error.message);
        throw error;
    }
}

async function addProduct(data) {
    try {
        const { prod_title, prod_title_en, prod_desc, pr_id, out_id } = data;

        const escapeSql = (str) => (str && str.trim() !== '' ? `'${str.replace(/'/g, "''")}'` : 'NULL');

        const sql = `
            INSERT INTO Products (
                prod_title, prod_title_en, prod_desc, pr_id, out_id
            ) VALUES (
                ${escapeSql(prod_title)}, 
                ${escapeSql(prod_title_en)}, 
                ${escapeSql(prod_desc)}, 
                ${pr_id ? Number(pr_id) : 'NULL'}, 
                ${out_id ? Number(out_id) : 'NULL'}
            )
        `;

        if (typeof db.execute === 'function') {
            await db.execute(sql);
        } else {
            await db.query(sql);
        }
        return { success: true };
    } catch (error) {
        console.error("Error in addProduct:", error.message);
        throw error;
    }
}

async function deleteProduct(prod_id) {
    try {
        if (!prod_id) {
            console.error("deleteProduct error: prod_id is missing");
            return { success: false };
        }

        const sql = `DELETE FROM Products WHERE prod_id = ${Number(prod_id)}`;
        
        if (typeof db.execute === 'function') {
            await db.execute(sql);
        } else {
            await db.query(sql);
        }
        return { success: true };
    } catch (error) {
        console.error("Error in deleteProduct:", error.message);
        throw error;
    }
}

module.exports = { getAllProductsByProjectID, addProduct, deleteProduct };
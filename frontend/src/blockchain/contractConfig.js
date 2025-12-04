import { keccak256, toUtf8Bytes } from "ethers";

/**
 * Hash utilities for product security
 * Uses Keccak256 hashing to create unique product identifiers
 */

/**
 * Generate hash from product data
 * @param {Object} productData - Product information
 * @returns {string} - Keccak256 hash
 */
export function generateProductHash(productData) {
    const productString = JSON.stringify(productData);
    return keccak256(toUtf8Bytes(productString));
}

/**
 * Verify product authenticity by comparing hashes
 * @param {Object} productData - Product information
 * @param {string} storedHash - Hash to compare against
 * @returns {boolean} - True if hashes match
 */
export function verifyProductHash(productData, storedHash) {
    const calculatedHash = generateProductHash(productData);
    return calculatedHash === storedHash;
}

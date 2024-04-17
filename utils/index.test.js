import { expect, test } from 'vitest'
import { bytesToSize } from './index';

// Test case 1: bytesToSize should return "0 Byte" when input is 0
test('bytesToSize should return "0 Byte" when input is 0', () => {
  expect(bytesToSize(0)).toBe("0 Byte");
});

// Test case 2: bytesToSize should return the correct size in Bytes
test('bytesToSize should return the correct size in Bytes', () => {
  expect(bytesToSize(100)).toBe("100 Bytes");
});

// Test case 3: bytesToSize should return the correct size in KB
test('bytesToSize should return the correct size in KB', () => {
  expect(bytesToSize(1024)).toBe("1 KB");
});

// Test case 4: bytesToSize should return the correct size in MB
test('bytesToSize should return the correct size in MB', () => {
  expect(bytesToSize(1048576)).toBe("1 MB");
});
test('bytesToSize should return the correct size in MB', () => {
  expect(bytesToSize(1048576)).toBe("1 MB");
});

// Test case 5: bytesToSize should return the correct size in GB
test('bytesToSize should return the correct size in GB', () => {
  expect(bytesToSize(1073741824)).toBe("1 GB");
});

// Test case 6: bytesToSize should return the correct size in TB
test('bytesToSize should return the correct size in TB', () => {
  expect(bytesToSize(1099511627776)).toBe("1 TB");
});

// Test case 7: bytesToSize should return the correct size with decimal places
test('bytesToSize should return the correct size with decimal places', () => {
  expect(bytesToSize(1500)).toBe("1.46 KB");
});

// Test case 8: bytesToSize should return an integer when rounded size is an integer
test('bytesToSize should return an integer when rounded size is an integer', () => {
  expect(bytesToSize(137219)).toBe("134 KB");
});
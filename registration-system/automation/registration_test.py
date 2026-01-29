from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time, os

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

# Correct path to index.html
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
file_path = os.path.join(base_dir, "index.html")
driver.get("file:///" + file_path)

print("PAGE URL:", driver.current_url)
print("PAGE TITLE:", driver.title)

# ---------------- NEGATIVE SCENARIO ----------------
wait.until(EC.presence_of_element_located((By.ID, "fname"))).send_keys("Sanjeev")
driver.find_element(By.ID, "email").send_keys("sanjeev@gmail.com")
driver.find_element(By.ID, "phone").send_keys("+919999999999")
driver.find_element(By.XPATH, "//input[@value='Male']").click()
driver.find_element(By.ID, "terms").click()

driver.find_element(By.ID, "submitBtn").click()
time.sleep(2)

driver.save_screenshot("screenshots/error-state.png")
print("❌ error-state.png captured")

# ---------------- POSITIVE SCENARIO ----------------
driver.find_element(By.ID, "lname").send_keys("Kumar")

driver.find_element(By.ID, "country").send_keys("India")
time.sleep(1)
driver.find_element(By.ID, "state").send_keys("Telangana")
time.sleep(1)
driver.find_element(By.ID, "city").send_keys("Hyderabad")

driver.find_element(By.ID, "password").send_keys("Test@123")
driver.find_element(By.ID, "confirmPassword").send_keys("Test@123")

driver.find_element(By.ID, "submitBtn").click()
time.sleep(2)

driver.save_screenshot("screenshots/success-state.png")
print("✅ success-state.png captured")

driver.quit()
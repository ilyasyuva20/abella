import os
import zipfile

def zip_directory(folder_path, zip_path):
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, folder_path)
                zipf.write(file_path, arcname)

if __name__ == '__main__':
    theme_folder = '/home/ilyas/ILYAS/Shopify/ABELLA/Abella/shopify-theme'
    zip_output = '/home/ilyas/ILYAS/Shopify/ABELLA/Abella/abella-shopify-theme.zip'
    zip_directory(theme_folder, zip_output)
    print(f'Shopify theme successfully packaged into: {zip_output}')

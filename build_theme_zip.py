import os
import zipfile

def zip_theme_root(root_path, zip_path):
    theme_dirs = ['assets', 'config', 'layout', 'sections', 'snippets', 'templates']
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for t_dir in theme_dirs:
            dir_full = os.path.join(root_path, t_dir)
            if os.path.exists(dir_full):
                for root, dirs, files in os.walk(dir_full):
                    for file in files:
                        file_path = os.path.join(root, file)
                        arcname = os.path.relpath(file_path, root_path)
                        zipf.write(file_path, arcname)

if __name__ == '__main__':
    root_folder = '/home/ilyas/ILYAS/Shopify/ABELLA/Abella'
    zip_output = '/home/ilyas/ILYAS/Shopify/ABELLA/Abella/abella-shopify-theme.zip'
    zip_theme_root(root_folder, zip_output)
    print(f'Shopify theme successfully packaged into: {zip_output}')

#!/bin/bash
cd /home/kavia/workspace/code-generation/multi-tenant-inventory-and-workspace-manager-18176-18194/inventory_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


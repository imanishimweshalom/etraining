#!/bin/bash

set -e

echo "Creating eTraining architecture..."

# App
mkdir -p \
src/app/providers \
src/app/router \
src/app/config

# Shared assets
mkdir -p src/assets

# Shared components
mkdir -p \
src/components/ui \
src/components/layout \
src/components/navigation \
src/components/forms \
src/components/feedback

# Business features
mkdir -p \
src/features/training \
src/features/scenarios \
src/features/simulation \
src/features/assessment \
src/features/progress \
src/features/certificates \
src/features/authentication \
src/features/users \
src/features/organizations \
src/features/notifications \
src/features/analytics

# 3D engine
mkdir -p \
src/modules/three/components \
src/modules/three/scenes \
src/modules/three/loaders \
src/modules/three/interactions \
src/modules/three/utils

# VR engine
mkdir -p \
src/modules/vr/input \
src/modules/vr/controllers \
src/modules/vr/locomotion \
src/modules/vr/interaction

# Training engine
mkdir -p \
src/modules/training-engine/runtime \
src/modules/training-engine/scoring \
src/modules/training-engine/events \
src/modules/training-engine/state

# Public pages
mkdir -p \
src/pages/public/Home \
src/pages/public/Trainings \
src/pages/public/About \
src/pages/public/HowItWorks \
src/pages/public/VRExperience \
src/pages/public/Contact

# Authentication pages
mkdir -p \
src/pages/auth/Login \
src/pages/auth/Register

# Future dashboards
mkdir -p \
src/pages/trainee \
src/pages/trainer \
src/pages/admin \
src/pages/organization

# Layouts
mkdir -p src/layouts

# Services
mkdir -p \
src/services/api \
src/services/auth \
src/services/training \
src/services/users \
src/services/storage

# State, hooks, types, data
mkdir -p \
src/store \
src/hooks \
src/types \
src/data \
src/constants \
src/utils \
src/styles

# Training content
mkdir -p \
training-content/construction-safety/metadata \
training-content/construction-safety/scenarios/ppe-inspection \
training-content/construction-safety/scenarios/hazard-identification \
training-content/construction-safety/scenarios/working-at-height \
training-content/construction-safety/scenarios/emergency-response \
training-content/construction-safety/assets \
training-content/fire-safety \
training-content/electrical-safety \
training-content/medical-safety \
training-content/industrial-safety

# 3D assets
mkdir -p \
assets-3d/construction \
assets-3d/characters \
assets-3d/equipment \
assets-3d/environments \
assets-3d/shared

# Tests
mkdir -p \
tests/unit \
tests/integration \
tests/e2e

# Documentation
mkdir -p \
docs/architecture \
docs/training \
docs/vr \
docs/api \
docs/development

echo ""
echo "eTraining architecture created successfully."
echo ""
echo "Checking structure..."
echo ""

find src training-content assets-3d tests docs -type d | sort

echo ""
echo "Done."

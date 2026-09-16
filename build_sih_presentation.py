import pptx
from pptx.util import Inches, Pt
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

def update_text_frame(tf, text_content):
    """Safely updates text_frame while maintaining existing font properties if possible"""
    paragraphs = text_content.split('\n')
    
    first_p = tf.paragraphs[0] if tf.paragraphs else None
    font_name = first_p.font.name if first_p and first_p.font else None
    font_size = first_p.font.size if first_p and first_p.font else None
    font_bold = first_p.font.bold if first_p and first_p.font else None
    font_color = first_p.font.color.rgb if first_p and first_p.font and hasattr(first_p.font.color, 'rgb') and first_p.font.color.rgb else None

    # Clear extra paragraphs
    p_elems = list(tf.paragraphs)
    for p in p_elems[1:]:
        p._p.getparent().remove(p._p)

    # Update first paragraph
    if tf.paragraphs:
        tf.paragraphs[0].text = paragraphs[0]
        if font_name: tf.paragraphs[0].font.name = font_name
        if font_size: tf.paragraphs[0].font.size = font_size
        if font_bold is not None: tf.paragraphs[0].font.bold = font_bold
        if font_color: tf.paragraphs[0].font.color.rgb = font_color

    # Add remaining paragraphs
    for p_text in paragraphs[1:]:
        new_p = tf.add_paragraph()
        new_p.text = p_text
        if font_name: new_p.font.name = font_name
        if font_size: new_p.font.size = font_size
        if font_bold is not None: new_p.font.bold = font_bold
        if font_color: new_p.font.color.rgb = font_color

def build_presentation():
    input_path = 'd:/SIH26_3/MastiSense_AI_SIH_Idea_Submission.pptx'
    output_path = 'd:/SIH26_3/SIH26003_SmritiNER_Idea_Submission.pptx'

    prs = pptx.Presentation(input_path)

    # -------------------------------------------------------------------------
    # SLIDE 1: Title Slide
    # -------------------------------------------------------------------------
    s1 = prs.slides[0]
    for shape in s1.shapes:
        if shape.shape_id == 4 or shape.name == "Subtitle 3":
            update_text_frame(shape.text_frame, "SmritiNER")
        elif shape.shape_id == 8 or shape.name == "Title 7":
            update_text_frame(shape.text_frame, "SMART INDIA HACKATHON 2026")
        elif shape.shape_id == 10 or shape.name == "TextBox 9":
            content_s1 = (
                "Problem Statement ID – SIH26003\n"
                "Problem Statement Title – AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in the North Eastern Region (NER)\n"
                "Theme – MedTech / HealthTech / Software\n"
                "PS Category – Software\n"
                "Ministry / Organization – Ministry of Development of North Eastern Region (MDoNER)\n"
                "Team ID – [ENTER TEAM ID]\n"
                "Team Name – [ENTER REGISTERED TEAM NAME]"
            )
            update_text_frame(shape.text_frame, content_s1)
        elif shape.shape_id == 1027 or shape.name == "TextBox 1026":
            update_text_frame(shape.text_frame, "Stimulate. Reminisce. Protect.")
        elif shape.shape_id == 1028 or shape.name == "TextBox 1027":
            update_text_frame(shape.text_frame, "AI-driven adaptive cognitive stimulation, regional memory assistance & caregiver monitoring for elderly dementia patients in NER")

    # -------------------------------------------------------------------------
    # SLIDE 2: Idea Title & Proposed Solution
    # -------------------------------------------------------------------------
    s2 = prs.slides[1]
    for shape in s2.shapes:
        if shape.shape_id == 15361 or shape.name == "Title 1":
            update_text_frame(shape.text_frame, "SMRITINER: AI COGNITIVE CARE FOR NER")
        elif shape.shape_id == 15365 or shape.name == "TextBox 15364":
            update_text_frame(shape.text_frame, "PROPOSED SOLUTION")
        elif shape.shape_id == 15366 or shape.name == "TextBox 15365":
            update_text_frame(shape.text_frame, "SmritiNER provides tablet-first, offline-ready cognitive stimulation through 4 culturally grounded game domains, an AI adaptive difficulty engine, regional voice guidance, and an integrated caregiver monitoring portal.")
        # Process 01
        elif shape.shape_id == 15369 or shape.name == "TextBox 15368":
            update_text_frame(shape.text_frame, "Cultural Stimuli")
        elif shape.shape_id == 15370 or shape.name == "TextBox 15369":
            update_text_frame(shape.text_frame, "Bihu • Hornbill • Weaves")
        # Process 02
        elif shape.shape_id == 15374 or shape.name == "TextBox 15373":
            update_text_frame(shape.text_frame, "Telemetry Engine")
        elif shape.shape_id == 15375 or shape.name == "TextBox 15374":
            update_text_frame(shape.text_frame, "Latency • Hesitation • Errors")
        # Process 03
        elif shape.shape_id == 15379 or shape.name == "TextBox 15378":
            update_text_frame(shape.text_frame, "Adaptive AI Core")
        elif shape.shape_id == 15380 or shape.name == "TextBox 15379":
            update_text_frame(shape.text_frame, "Dynamic Scaffolding & Level")
        # Process 04
        elif shape.shape_id == 15384 or shape.name == "TextBox 15383":
            update_text_frame(shape.text_frame, "Voice Companion")
        elif shape.shape_id == 15385 or shape.name == "TextBox 15384":
            update_text_frame(shape.text_frame, "AS • MNI • BN • HI • EN")
        # Process 05
        elif shape.shape_id == 15389 or shape.name == "TextBox 15388":
            update_text_frame(shape.text_frame, "Caregiver Safety")
        elif shape.shape_id == 15390 or shape.name == "TextBox 15389":
            update_text_frame(shape.text_frame, "MoCA Radar • GPS Geofence")
        # Lower 3 Columns
        elif shape.shape_id == 15393 or shape.name == "TextBox 15392":
            update_text_frame(shape.text_frame, "HOW IT ADDRESSES THE PROBLEM")
        elif shape.shape_id == 15394 or shape.name == "TextBox 15393":
            c_how = (
                "• Non-pharmacological cognitive therapy tailored to NER culture\n"
                "• Scaffolding prevents patient agitation and preserves dignity\n"
                "• 100% offline functionality handles remote hilly terrain\n"
                "• Automated caregiver telemetry bridges shortage of geriatricians"
            )
            update_text_frame(shape.text_frame, c_how)
        elif shape.shape_id == 15397 or shape.name == "TextBox 15396":
            update_text_frame(shape.text_frame, "INNOVATION / UNIQUENESS")
        elif shape.shape_id == 15398 or shape.name == "TextBox 15397":
            c_innov = (
                "• Real-time adaptive latency engine, not static memory tests\n"
                "• Authentic NER motifs: Bihu Dhol, Hornbill, Muga Silk, Majuli\n"
                "• Sensory agitation calming zone with procedural bamboo flute\n"
                "• GPS safe-zone wandering simulator for dementia safety"
            )
            update_text_frame(shape.text_frame, c_innov)
        elif shape.shape_id == 15401 or shape.name == "TextBox 15400":
            update_text_frame(shape.text_frame, "MVP OUTPUT")
        elif shape.shape_id == 15402 or shape.name == "TextBox 15401":
            c_mvp = (
                "Patient: Boruah Aita (74, Guwahati)\n"
                "Cognitive Index: 84% | STABLE\n"
                "Memory: 78% • Attention: 84% • Latency: 3.2s\n"
                "Adherence: Routine & Medicines Completed\n"
                "Safety: Inside Safe Zone (No Wandering Breach)"
            )
            update_text_frame(shape.text_frame, c_mvp)
        elif shape.name == "TextBox 15402":
            update_text_frame(shape.text_frame, "*MoCA-aligned domains are standardized; platform functions fully offline with zero internet dependency in remote NER hills.")

    # -------------------------------------------------------------------------
    # SLIDE 3: Technical Approach
    # -------------------------------------------------------------------------
    s3 = prs.slides[2]
    for shape in s3.shapes:
        if shape.shape_id == 15361 or shape.name == "Title 1":
            update_text_frame(shape.text_frame, "TECHNICAL APPROACH & PIPELINE")
        elif shape.name == "TextBox 17410":
            update_text_frame(shape.text_frame, "TECHNOLOGY STACK")
        elif shape.name == "TextBox 17413":
            update_text_frame(shape.text_frame, "AI & Adaptive Core")
        elif shape.name == "TextBox 17414":
            update_text_frame(shape.text_frame, "Mathematical Latency Adjuster • Touch Hesitation\nCognitive Fatigue Scoring • Auto-Scaffolding")
        elif shape.name == "TextBox 17417":
            update_text_frame(shape.text_frame, "Frontend / PWA")
        elif shape.name == "TextBox 17418":
            update_text_frame(shape.text_frame, "React 18 • Vite • Tailwind CSS • Canvas Confetti\nWCAG AAA High Contrast & Font Scaler")
        elif shape.name == "TextBox 17421":
            update_text_frame(shape.text_frame, "Audio & Speech")
        elif shape.name == "TextBox 17422":
            update_text_frame(shape.text_frame, "Web Speech API (AS, MNI, BN, HI, EN)\nWeb Audio API Procedural Bamboo Flute Synthesis")
        elif shape.name == "TextBox 17425":
            update_text_frame(shape.text_frame, "Offline Storage & Sync")
        elif shape.name == "TextBox 17426":
            update_text_frame(shape.text_frame, "IndexedDB • Cache API • PWA Service Worker\nLocal Telemetry Queue • Tele-Health Sync API")
        elif shape.name == "TextBox 17427":
            update_text_frame(shape.text_frame, "ADAPTIVE COGNITIVE PIPELINE")
        # Pipeline 4 pill badges
        elif shape.name == "Rounded Rectangle 17429":
            update_text_frame(shape.text_frame, "TOUCH")
        elif shape.name == "TextBox 17430":
            update_text_frame(shape.text_frame, "Patient Touch\nReaction Latency\nCard Choices")
        elif shape.name == "Rounded Rectangle 17433":
            update_text_frame(shape.text_frame, "LATENCY")
        elif shape.name == "TextBox 17434":
            update_text_frame(shape.text_frame, "Hesitation Gap\nRolling Mean\nError Streak Delta")
        elif shape.name == "Rounded Rectangle 17437":
            update_text_frame(shape.text_frame, "ADAPTIVE AI")
        elif shape.name == "TextBox 17438":
            update_text_frame(shape.text_frame, "AI Engine\nFatigue Index F_score\nAdaptive Level 1–3")
        elif shape.name == "Rounded Rectangle 17441":
            update_text_frame(shape.text_frame, "SCAFFOLD")
        elif shape.name == "TextBox 17442":
            update_text_frame(shape.text_frame, "Scaffold Trigger\nAudio Voice Clue\nVisual Card Glow")
        elif shape.name == "TextBox 17445":
            update_text_frame(shape.text_frame, "EXPLAINABLE & GENTLE AI")
        elif shape.name == "TextBox 17446":
            c_exp = (
                "Example: Latency > 6.0s detected\n"
                "• Hesitation on Bihu Dhol card\n"
                "• Auto-triggers gentle spoken regional cue\n"
                "• Reduces level if fatigue > 75%\n"
                "Preserves dignity; avoids testing anxiety."
            )
            update_text_frame(shape.text_frame, c_exp)
        elif shape.name == "TextBox 17449":
            update_text_frame(shape.text_frame, "DEPLOYMENT MODEL")
        elif shape.name == "TextBox 17450":
            c_dep = (
                "Home: Elderly tablet / touch device\n"
                "Caregiver: PIN-protected portal\n"
                "Clinics: Community Health Center kiosks\n"
                "100% offline-ready across all modes."
            )
            update_text_frame(shape.text_frame, c_dep)
        elif shape.name == "TextBox 17451":
            update_text_frame(shape.text_frame, "SYSTEM FLOW")
        elif shape.name == "TextBox 17453":
            update_text_frame(shape.text_frame, "Patient\nInteraction")
        elif shape.name == "TextBox 17456":
            update_text_frame(shape.text_frame, "Telemetry\nEngine")
        elif shape.name == "TextBox 17459":
            update_text_frame(shape.text_frame, "Adaptive\nAI Core")
        elif shape.name == "TextBox 17462":
            update_text_frame(shape.text_frame, "IndexedDB\nLocal Cache")
        elif shape.name == "TextBox 17465":
            update_text_frame(shape.text_frame, "Caregiver\nDoctor Portal")

    # -------------------------------------------------------------------------
    # SLIDE 4: Feasibility and Viability
    # -------------------------------------------------------------------------
    s4 = prs.slides[3]
    for shape in s4.shapes:
        if shape.shape_id == 15361 or shape.name == "Title 1":
            update_text_frame(shape.text_frame, "FEASIBILITY AND VIABILITY")
        elif shape.name == "TextBox 17412":
            update_text_frame(shape.text_frame, "FEASIBILITY")
        elif shape.name == "TextBox 17413":
            c_feas = (
                "• Ultra-lightweight client-side architecture\n"
                "• Runs smoothly on affordable budget tablets\n"
                "• 100% offline functionality requires 0kb mobile data\n"
                "• Procedural Web Audio avoids large audio downloads\n"
                "• React + Vite enables modular, extensible development\n"
                "• Highly scalable across North Eastern rural districts\n\n"
                "Prototype → Community Health Centers → District Hospitals → Regional Scale"
            )
            update_text_frame(shape.text_frame, c_feas)
        elif shape.name == "TextBox 17416":
            update_text_frame(shape.text_frame, "CHALLENGES & RISKS")
        elif shape.name == "TextBox 17417":
            c_chal = (
                "• Spotty digital connectivity in hilly terrains\n"
                "• Diverse dialects across 8 North Eastern states\n"
                "• Low digital familiarity among elderly patients\n"
                "• Sensory agitation / sundowning in dementia\n"
                "• Wandering risks in hazardous hilly terrains\n"
                "• Severe shortage of specialized geriatricians\n\n"
                "Non-pharmacological assistance, not replacement for acute medical care."
            )
            update_text_frame(shape.text_frame, c_chal)
        elif shape.name == "TextBox 17420":
            update_text_frame(shape.text_frame, "MITIGATION")
        elif shape.name == "TextBox 17421":
            c_mit = (
                "• Offline-First IndexedDB local caching\n"
                "• Multi-lingual voice in Assamese, Meitei, Bengali, Hindi\n"
                "• Senior-accessible UX (>52px targets, AAA contrast)\n"
                "• Peaceful sensory calming zone (bamboo flute & breathing)\n"
                "• GPS Safe-Zone Wandering simulator with SMS alert\n"
                "• MoCA-aligned radar charts & one-click clinical PDF\n"
                "• Tested with regional geriatric caregivers\n"
                "• Voice-first guidance for zero literacy barriers"
            )
            update_text_frame(shape.text_frame, c_mit)

    # -------------------------------------------------------------------------
    # SLIDE 5: Impact and Benefits
    # -------------------------------------------------------------------------
    s5 = prs.slides[4]
    for shape in s5.shapes:
        if shape.shape_id == 15361 or shape.name == "Title 1":
            update_text_frame(shape.text_frame, "IMPACT AND BENEFITS")
        elif shape.name == "TextBox 17410":
            update_text_frame(shape.text_frame, "WHO BENEFITS?")
        elif shape.name == "Rounded Rectangle 17412":
            update_text_frame(shape.text_frame, "Elderly Patients")
        elif shape.name == "TextBox 17413":
            update_text_frame(shape.text_frame, "Cognitive stimulation & dignity")
        elif shape.name == "Rounded Rectangle 17415":
            update_text_frame(shape.text_frame, "Family Caregivers")
        elif shape.name == "TextBox 17416":
            update_text_frame(shape.text_frame, "Reduced stress & wandering alert")
        elif shape.name == "Rounded Rectangle 17418":
            update_text_frame(shape.text_frame, "Geriatricians")
        elif shape.name == "TextBox 17419":
            update_text_frame(shape.text_frame, "Objective 7-day MoCA telemetry")
        elif shape.name == "Rounded Rectangle 17421":
            update_text_frame(shape.text_frame, "MDoNER & CHCs")
        elif shape.name == "TextBox 17422":
            update_text_frame(shape.text_frame, "Scalable rural elderly care")
        elif shape.name == "TextBox 17423":
            update_text_frame(shape.text_frame, "PATIENT CARE VALUE CHAIN")
        elif shape.name == "TextBox 17425":
            update_text_frame(shape.text_frame, "Early\nStimulation")
        elif shape.name == "TextBox 17428":
            update_text_frame(shape.text_frame, "Dignified\nScaffolding")
        elif shape.name == "TextBox 17431":
            update_text_frame(shape.text_frame, "Reduced\nAgitation")
        elif shape.name == "TextBox 17434":
            update_text_frame(shape.text_frame, "Family\nReassurance")
        elif shape.name == "TextBox 17437":
            update_text_frame(shape.text_frame, "SOCIAL & ECONOMIC IMPACT")
        elif shape.name == "TextBox 17438":
            c_soc = (
                "• Directly addresses the severe geriatric healthcare deficit in NER\n"
                "• Lowers avoidable hospitalizations and wandering emergencies\n"
                "• Preserves indigenous cultural memories, folk songs, and dialects\n"
                "• Provides equal healthcare access to rural and tribal communities"
            )
            update_text_frame(shape.text_frame, c_soc)
        elif shape.name == "TextBox 17441":
            update_text_frame(shape.text_frame, "SCALABILITY")
        elif shape.name == "TextBox 17442":
            c_scale = (
                "One patient → One family → Community Health Centers → District hospital → 8 NER States → Pan-India\n"
                "Hardware-agnostic • Zero data cost • Multi-lingual • Standardized MoCA framework"
            )
            update_text_frame(shape.text_frame, c_scale)

    # -------------------------------------------------------------------------
    # SLIDE 6: Research and References
    # -------------------------------------------------------------------------
    s6 = prs.slides[5]
    for shape in s6.shapes:
        if shape.shape_id == 15361 or shape.name == "Title 1":
            update_text_frame(shape.text_frame, "RESEARCH AND REFERENCES")
        elif shape.name == "TextBox 17410":
            update_text_frame(shape.text_frame, "RESEARCH BASIS")
        elif shape.name == "TextBox 17411":
            update_text_frame(shape.text_frame, "The SmritiNER platform is grounded in peer-reviewed clinical research on cognitive stimulation therapy, the Montreal Cognitive Assessment (MoCA), non-pharmacological dementia care, and geriatric health in India.")
        # Ref 1
        elif shape.name == "TextBox 17413":
            update_text_frame(shape.text_frame, "[1] Nasreddine, Z. S. et al. (2005).")
        elif shape.name == "TextBox 17414":
            update_text_frame(shape.text_frame, "The Montreal Cognitive Assessment, MoCA: A brief screening tool for mild cognitive impairment. Journal of the American Geriatrics Society, 53(4), 695–699. DOI: 10.1111/j.1532-5415.2005.53221.x")
        # Ref 2
        elif shape.name == "TextBox 17416":
            update_text_frame(shape.text_frame, "[2] Woods, B. et al. (2018).")
        elif shape.name == "TextBox 17417":
            update_text_frame(shape.text_frame, "Reminiscence therapy for dementia. Cochrane Database of Systematic Reviews, 3(3), CD001120. DOI: 10.1002/14651858.CD001120.pub3")
        # Ref 3
        elif shape.name == "TextBox 17419":
            update_text_frame(shape.text_frame, "[3] Livingston, G. et al. (2020).")
        elif shape.name == "TextBox 17420":
            update_text_frame(shape.text_frame, "Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. The Lancet, 396(10248), 413–446. DOI: 10.1016/S0140-6736(20)30367-6")
        # Ref 4
        elif shape.name == "TextBox 17422":
            update_text_frame(shape.text_frame, "[4] MDoNER & MoHFW (2023).")
        elif shape.name == "TextBox 17423":
            update_text_frame(shape.text_frame, "Assessment of Geriatric Care and Specialized Mental Health Facilities in the North Eastern Region of India. Government of India Policy Report.")
        # Ref 5
        elif shape.name == "TextBox 17425":
            update_text_frame(shape.text_frame, "[5] WHO (2021).")
        elif shape.name == "TextBox 17426":
            update_text_frame(shape.text_frame, "Global status report on the public health response to dementia. World Health Organization, Geneva. Non-pharmacological cognitive stimulation guidelines.")
        elif shape.name == "TextBox 17427":
            update_text_frame(shape.text_frame, "Verified clinical sources: The Lancet • Cochrane Library • JAGS • PubMed • WHO • Ministry of Development of North Eastern Region")

    prs.save(output_path)
    print("Presentation successfully updated and saved to: " + output_path)

if __name__ == "__main__":
    build_presentation()

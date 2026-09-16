import pptx
from pptx.util import Inches, Pt
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor
import os

def build_complete_deck():
    template_path = 'd:/SIH26_3/MastiSense_AI_SIH_Idea_Submission.pptx'
    output_path = 'd:/SIH26_3/SIH26003_SmritiNER_Idea_Submission.pptx'

    prs = pptx.Presentation(template_path)
    blank_layout = prs.slide_layouts[6] if len(prs.slide_layouts) > 6 else prs.slide_layouts[0]

    def update_text_frame(tf, text_content):
        paragraphs = text_content.split('\n')
        first_p = tf.paragraphs[0] if tf.paragraphs else None
        font_name = first_p.font.name if first_p and first_p.font else None
        font_size = first_p.font.size if first_p and first_p.font else None
        font_bold = first_p.font.bold if first_p and first_p.font else None
        font_color = first_p.font.color.rgb if first_p and first_p.font and hasattr(first_p.font.color, 'rgb') and first_p.font.color.rgb else None

        p_elems = list(tf.paragraphs)
        for p in p_elems[1:]:
            p._p.getparent().remove(p._p)

        if tf.paragraphs:
            tf.paragraphs[0].text = paragraphs[0]
            if font_name: tf.paragraphs[0].font.name = font_name
            if font_size: tf.paragraphs[0].font.size = font_size
            if font_bold is not None: tf.paragraphs[0].font.bold = font_bold
            if font_color: tf.paragraphs[0].font.color.rgb = font_color

        for p_text in paragraphs[1:]:
            new_p = tf.add_paragraph()
            new_p.text = p_text
            if font_name: new_p.font.name = font_name
            if font_size: new_p.font.size = font_size
            if font_bold is not None: new_p.font.bold = font_bold
            if font_color: new_p.font.color.rgb = font_color

    # -------------------------------------------------------------
    # SLIDE 1: Title
    # -------------------------------------------------------------
    s1 = prs.slides[0]
    for sh in s1.shapes:
        if sh.shape_id == 4 or sh.name == "Subtitle 3":
            update_text_frame(sh.text_frame, "SmritiNER")
        elif sh.shape_id == 8 or sh.name == "Title 7":
            update_text_frame(sh.text_frame, "SMART INDIA HACKATHON 2026")
        elif sh.shape_id == 10 or sh.name == "TextBox 9":
            content_s1 = (
                "Problem Statement ID – SIH26003\n"
                "Problem Statement Title – AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in the North Eastern Region (NER)\n"
                "Theme – MedTech / HealthTech / Software\n"
                "PS Category – Software\n"
                "Ministry / Organization – Ministry of Development of North Eastern Region (MDoNER)\n"
                "Team ID – [ENTER TEAM ID]\n"
                "Team Name – [ENTER REGISTERED TEAM NAME]"
            )
            update_text_frame(sh.text_frame, content_s1)
        elif sh.shape_id == 1027 or sh.name == "TextBox 1026":
            update_text_frame(sh.text_frame, "Stimulate. Reminisce. Protect.")
        elif sh.shape_id == 1028 or sh.name == "TextBox 1027":
            update_text_frame(sh.text_frame, "AI-driven adaptive cognitive stimulation, regional memory assistance & caregiver monitoring for elderly dementia patients in NER")

    # -------------------------------------------------------------
    # SLIDE 2: Idea Title & Proposed Solution
    # -------------------------------------------------------------
    s2 = prs.slides[1]
    for sh in s2.shapes:
        if sh.name == "Title 1":
            update_text_frame(sh.text_frame, "SMRITINER: AI COGNITIVE CARE FOR NER")
        elif sh.name == "TextBox 15364":
            update_text_frame(sh.text_frame, "PROPOSED SOLUTION")
        elif sh.name == "TextBox 15365":
            update_text_frame(sh.text_frame, "SmritiNER provides tablet-first, offline-ready cognitive stimulation through 4 culturally grounded game domains, an AI adaptive difficulty engine, regional voice guidance, and an integrated caregiver monitoring portal.")
        elif sh.name == "TextBox 15368": update_text_frame(sh.text_frame, "Cultural Stimuli")
        elif sh.name == "TextBox 15369": update_text_frame(sh.text_frame, "Bihu • Hornbill • Weaves")
        elif sh.name == "TextBox 15373": update_text_frame(sh.text_frame, "Telemetry Engine")
        elif sh.name == "TextBox 15374": update_text_frame(sh.text_frame, "Latency • Hesitation • Errors")
        elif sh.name == "TextBox 15378": update_text_frame(sh.text_frame, "Adaptive AI Core")
        elif sh.name == "TextBox 15379": update_text_frame(sh.text_frame, "Dynamic Scaffolding & Level")
        elif sh.name == "TextBox 15383": update_text_frame(sh.text_frame, "Voice Companion")
        elif sh.name == "TextBox 15384": update_text_frame(sh.text_frame, "AS • MNI • BN • HI • EN")
        elif sh.name == "TextBox 15388": update_text_frame(sh.text_frame, "Caregiver Safety")
        elif sh.name == "TextBox 15389": update_text_frame(sh.text_frame, "MoCA Radar • GPS Geofence")
        elif sh.name == "TextBox 15392": update_text_frame(sh.text_frame, "HOW IT ADDRESSES THE PROBLEM")
        elif sh.name == "TextBox 15393":
            update_text_frame(sh.text_frame, "• Non-pharmacological cognitive therapy tailored to NER culture\n• Scaffolding prevents patient agitation and preserves dignity\n• 100% offline functionality handles remote hilly terrain\n• Automated caregiver telemetry bridges shortage of geriatricians")
        elif sh.name == "TextBox 15396": update_text_frame(sh.text_frame, "INNOVATION / UNIQUENESS")
        elif sh.name == "TextBox 15397":
            update_text_frame(sh.text_frame, "• Real-time adaptive latency engine, not static memory tests\n• Authentic NER motifs: Bihu Dhol, Hornbill, Muga Silk, Majuli\n• Sensory agitation calming zone with procedural bamboo flute\n• GPS safe-zone wandering simulator for dementia safety")
        elif sh.name == "TextBox 15400": update_text_frame(sh.text_frame, "MVP OUTPUT")
        elif sh.name == "TextBox 15401":
            update_text_frame(sh.text_frame, "Patient: Boruah Aita (74, Guwahati)\nCognitive Index: 84% | STABLE\nMemory: 78% • Attention: 84% • Latency: 3.2s\nAdherence: Routine & Medicines Completed\nSafety: Inside Safe Zone (No Wandering Breach)")
        elif sh.name == "TextBox 15402":
            update_text_frame(sh.text_frame, "*MoCA-aligned domains are standardized; platform functions fully offline with zero internet dependency in remote NER hills.")

    # -------------------------------------------------------------
    # SLIDE 3: Technical Approach
    # -------------------------------------------------------------
    s3 = prs.slides[2]
    for sh in s3.shapes:
        if sh.name == "Title 1":
            update_text_frame(sh.text_frame, "TECHNICAL APPROACH & PIPELINE")
        elif sh.name == "TextBox 17410": update_text_frame(sh.text_frame, "TECHNOLOGY STACK")
        elif sh.name == "TextBox 17413": update_text_frame(sh.text_frame, "AI & Adaptive Core")
        elif sh.name == "TextBox 17414": update_text_frame(sh.text_frame, "Mathematical Latency Adjuster • Touch Hesitation\nCognitive Fatigue Scoring • Auto-Scaffolding")
        elif sh.name == "TextBox 17417": update_text_frame(sh.text_frame, "Frontend / PWA")
        elif sh.name == "TextBox 17418": update_text_frame(sh.text_frame, "React 18 • Vite • Tailwind CSS • Canvas Confetti\nWCAG AAA High Contrast & Font Scaler")
        elif sh.name == "TextBox 17421": update_text_frame(sh.text_frame, "Audio & Speech")
        elif sh.name == "TextBox 17422": update_text_frame(sh.text_frame, "Web Speech API (AS, MNI, BN, HI, EN)\nWeb Audio API Procedural Bamboo Flute Synthesis")
        elif sh.name == "TextBox 17425": update_text_frame(sh.text_frame, "Offline Storage & Sync")
        elif sh.name == "TextBox 17426": update_text_frame(sh.text_frame, "IndexedDB • Cache API • PWA Service Worker\nLocal Telemetry Queue • Tele-Health Sync API")
        elif sh.name == "TextBox 17427": update_text_frame(sh.text_frame, "ADAPTIVE COGNITIVE PIPELINE")
        elif sh.name == "Rounded Rectangle 17429": update_text_frame(sh.text_frame, "TOUCH")
        elif sh.name == "TextBox 17430": update_text_frame(sh.text_frame, "Patient Touch\nReaction Latency\nCard Choices")
        elif sh.name == "Rounded Rectangle 17433": update_text_frame(sh.text_frame, "LATENCY")
        elif sh.name == "TextBox 17434": update_text_frame(sh.text_frame, "Hesitation Gap\nRolling Mean\nError Streak Delta")
        elif sh.name == "Rounded Rectangle 17437": update_text_frame(sh.text_frame, "ADAPTIVE AI")
        elif sh.name == "TextBox 17438": update_text_frame(sh.text_frame, "AI Engine\nFatigue Index F_score\nAdaptive Level 1–3")
        elif sh.name == "Rounded Rectangle 17441": update_text_frame(sh.text_frame, "SCAFFOLD")
        elif sh.name == "TextBox 17442": update_text_frame(sh.text_frame, "Scaffold Trigger\nAudio Voice Clue\nVisual Card Glow")
        elif sh.name == "TextBox 17445": update_text_frame(sh.text_frame, "EXPLAINABLE & GENTLE AI")
        elif sh.name == "TextBox 17446":
            update_text_frame(sh.text_frame, "Example: Latency > 6.0s detected\n• Hesitation on Bihu Dhol card\n• Auto-triggers gentle spoken regional cue\n• Reduces level if fatigue > 75%\nPreserves dignity; avoids testing anxiety.")
        elif sh.name == "TextBox 17449": update_text_frame(sh.text_frame, "DEPLOYMENT MODEL")
        elif sh.name == "TextBox 17450":
            update_text_frame(sh.text_frame, "Home: Elderly tablet / touch device\nCaregiver: PIN-protected portal\nClinics: Community Health Center kiosks\n100% offline-ready across all modes.")
        elif sh.name == "TextBox 17451": update_text_frame(sh.text_frame, "SYSTEM FLOW")
        elif sh.name == "TextBox 17453": update_text_frame(sh.text_frame, "Patient\nInteraction")
        elif sh.name == "TextBox 17456": update_text_frame(sh.text_frame, "Telemetry\nEngine")
        elif sh.name == "TextBox 17459": update_text_frame(sh.text_frame, "Adaptive\nAI Core")
        elif sh.name == "TextBox 17462": update_text_frame(sh.text_frame, "IndexedDB\nLocal Cache")
        elif sh.name == "TextBox 17465": update_text_frame(sh.text_frame, "Caregiver\nDoctor Portal")

    # -------------------------------------------------------------
    # SLIDE 4: Feasibility and Viability
    # -------------------------------------------------------------
    s4 = prs.slides[3]
    for sh in s4.shapes:
        if sh.name == "Title 1": update_text_frame(sh.text_frame, "FEASIBILITY AND VIABILITY")
        elif sh.name == "TextBox 17412": update_text_frame(sh.text_frame, "FEASIBILITY")
        elif sh.name == "TextBox 17413":
            update_text_frame(sh.text_frame, "• Ultra-lightweight client-side architecture\n• Runs smoothly on affordable budget tablets\n• 100% offline functionality requires 0kb mobile data\n• Procedural Web Audio avoids large audio downloads\n• React + Vite enables modular, extensible development\n• Highly scalable across North Eastern rural districts\n\nPrototype → Community Health Centers → District Hospitals → Regional Scale")
        elif sh.name == "TextBox 17416": update_text_frame(sh.text_frame, "CHALLENGES & RISKS")
        elif sh.name == "TextBox 17417":
            update_text_frame(sh.text_frame, "• Spotty digital connectivity in hilly terrains\n• Diverse dialects across 8 North Eastern states\n• Low digital familiarity among elderly patients\n• Sensory agitation / sundowning in dementia\n• Wandering risks in hazardous hilly terrains\n• Severe shortage of specialized geriatricians\n\nNon-pharmacological assistance, not replacement for acute medical care.")
        elif sh.name == "TextBox 17420": update_text_frame(sh.text_frame, "MITIGATION")
        elif sh.name == "TextBox 17421":
            update_text_frame(sh.text_frame, "• Offline-First IndexedDB local caching\n• Multi-lingual voice in Assamese, Meitei, Bengali, Hindi\n• Senior-accessible UX (>52px targets, AAA contrast)\n• Peaceful sensory calming zone (bamboo flute & breathing)\n• GPS Safe-Zone Wandering simulator with SMS alert\n• MoCA-aligned radar charts & one-click clinical PDF\n• Tested with regional geriatric caregivers\n• Voice-first guidance for zero literacy barriers")

    # -------------------------------------------------------------
    # SLIDE 5: Impact and Benefits
    # -------------------------------------------------------------
    s5 = prs.slides[4]
    for sh in s5.shapes:
        if sh.name == "Title 1": update_text_frame(sh.text_frame, "IMPACT AND BENEFITS")
        elif sh.name == "TextBox 17410": update_text_frame(sh.text_frame, "WHO BENEFITS?")
        elif sh.name == "Rounded Rectangle 17412": update_text_frame(sh.text_frame, "Elderly Patients")
        elif sh.name == "TextBox 17413": update_text_frame(sh.text_frame, "Cognitive stimulation & dignity")
        elif sh.name == "Rounded Rectangle 17415": update_text_frame(sh.text_frame, "Family Caregivers")
        elif sh.name == "TextBox 17416": update_text_frame(sh.text_frame, "Reduced stress & wandering alert")
        elif sh.name == "Rounded Rectangle 17418": update_text_frame(sh.text_frame, "Geriatricians")
        elif sh.name == "TextBox 17419": update_text_frame(sh.text_frame, "Objective 7-day MoCA telemetry")
        elif sh.name == "Rounded Rectangle 17421": update_text_frame(sh.text_frame, "MDoNER & CHCs")
        elif sh.name == "TextBox 17422": update_text_frame(sh.text_frame, "Scalable rural elderly care")
        elif sh.name == "TextBox 17423": update_text_frame(sh.text_frame, "PATIENT CARE VALUE CHAIN")
        elif sh.name == "TextBox 17425": update_text_frame(sh.text_frame, "Early\nStimulation")
        elif sh.name == "TextBox 17428": update_text_frame(sh.text_frame, "Dignified\nScaffolding")
        elif sh.name == "TextBox 17431": update_text_frame(sh.text_frame, "Reduced\nAgitation")
        elif sh.name == "TextBox 17434": update_text_frame(sh.text_frame, "Family\nReassurance")
        elif sh.name == "TextBox 17437": update_text_frame(sh.text_frame, "SOCIAL & ECONOMIC IMPACT")
        elif sh.name == "TextBox 17438":
            update_text_frame(sh.text_frame, "• Directly addresses the severe geriatric healthcare deficit in NER\n• Lowers avoidable hospitalizations and wandering emergencies\n• Preserves indigenous cultural memories, folk songs, and dialects\n• Provides equal healthcare access to rural and tribal communities")
        elif sh.name == "TextBox 17441": update_text_frame(sh.text_frame, "SCALABILITY")
        elif sh.name == "TextBox 17442":
            update_text_frame(sh.text_frame, "One patient → One family → Community Health Centers → District hospital → 8 NER States → Pan-India\nHardware-agnostic • Zero data cost • Multi-lingual • Standardized MoCA framework")

    # -------------------------------------------------------------
    # SLIDE 6: Research and References
    # -------------------------------------------------------------
    s6 = prs.slides[5]
    for sh in s6.shapes:
        if sh.name == "Title 1": update_text_frame(sh.text_frame, "RESEARCH AND REFERENCES")
        elif sh.name == "TextBox 17410": update_text_frame(sh.text_frame, "RESEARCH BASIS")
        elif sh.name == "TextBox 17411": update_text_frame(sh.text_frame, "The SmritiNER platform is grounded in peer-reviewed clinical research on cognitive stimulation therapy, the Montreal Cognitive Assessment (MoCA), non-pharmacological dementia care, and geriatric health in India.")
        elif sh.name == "TextBox 17413": update_text_frame(sh.text_frame, "[1] Nasreddine, Z. S. et al. (2005).")
        elif sh.name == "TextBox 17414": update_text_frame(sh.text_frame, "The Montreal Cognitive Assessment, MoCA: A brief screening tool for mild cognitive impairment. Journal of the American Geriatrics Society, 53(4), 695–699. DOI: 10.1111/j.1532-5415.2005.53221.x")
        elif sh.name == "TextBox 17416": update_text_frame(sh.text_frame, "[2] Woods, B. et al. (2018).")
        elif sh.name == "TextBox 17417": update_text_frame(sh.text_frame, "Reminiscence therapy for dementia. Cochrane Database of Systematic Reviews, 3(3), CD001120. DOI: 10.1002/14651858.CD001120.pub3")
        elif sh.name == "TextBox 17419": update_text_frame(sh.text_frame, "[3] Livingston, G. et al. (2020).")
        elif sh.name == "TextBox 17420": update_text_frame(sh.text_frame, "Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. The Lancet, 396(10248), 413–446. DOI: 10.1016/S0140-6736(20)30367-6")
        elif sh.name == "TextBox 17422": update_text_frame(sh.text_frame, "[4] MDoNER & MoHFW (2023).")
        elif sh.name == "TextBox 17423": update_text_frame(sh.text_frame, "Assessment of Geriatric Care and Specialized Mental Health Facilities in the North Eastern Region of India. Government of India Policy Report.")
        elif sh.name == "TextBox 17425": update_text_frame(sh.text_frame, "[5] WHO (2021).")
        elif sh.name == "TextBox 17426": update_text_frame(sh.text_frame, "Global status report on the public health response to dementia. World Health Organization, Geneva. Non-pharmacological cognitive stimulation guidelines.")
        elif sh.name == "TextBox 17427": update_text_frame(sh.text_frame, "Verified clinical sources: The Lancet • Cochrane Library • JAGS • PubMed • WHO • Ministry of Development of North Eastern Region")

    # Helper to add standard slide template header/footer
    def add_template_chrome(slide, title_text, slide_number_str):
        # Header title
        title_box = slide.shapes.add_textbox(Inches(0.667), Inches(-0.052), Inches(12.0), Inches(1.25))
        tf = title_box.text_frame
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.name = "Segoe UI"
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = RGBColor(15, 23, 42)

        # Team Oval
        oval = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.361), Inches(0.276), Inches(1.369), Inches(0.883))
        oval.fill.solid()
        oval.fill.fore_color.rgb = RGBColor(16, 185, 129)
        oval.line.color.rgb = RGBColor(5, 150, 105)
        tf_ov = oval.text_frame
        p_ov = tf_ov.paragraphs[0]
        p_ov.text = "TEAM NAME"
        p_ov.font.size = Pt(9)
        p_ov.font.bold = True
        p_ov.font.color.rgb = RGBColor(255, 255, 255)

        # Footer text
        footer_box = slide.shapes.add_textbox(Inches(5.083), Inches(6.951), Inches(3.504), Inches(0.399))
        tf_f = footer_box.text_frame
        p_f = tf_f.paragraphs[0]
        p_f.text = "@SIH Idea submission- Template"
        p_f.font.size = Pt(10)
        p_f.font.color.rgb = RGBColor(148, 163, 184)

        # Slide Number
        num_box = slide.shapes.add_textbox(Inches(9.556), Inches(6.951), Inches(3.111), Inches(0.399))
        tf_n = num_box.text_frame
        p_n = tf_n.paragraphs[0]
        p_n.text = slide_number_str
        p_n.font.size = Pt(10)
        p_n.font.bold = True
        p_n.font.color.rgb = RGBColor(148, 163, 184)

    # -------------------------------------------------------------
    # SLIDE 7 (NEW): SYSTEM ARCHITECTURE & FLOWCHART
    # -------------------------------------------------------------
    s_flow = prs.slides.add_slide(blank_layout)
    add_template_chrome(s_flow, "SYSTEM ARCHITECTURE & FLOWCHART", "7")
    
    flowchart_img_path = 'd:/SIH26_3/flowchart_diagram.png'
    if os.path.exists(flowchart_img_path):
        # Center image on slide
        s_flow.shapes.add_picture(flowchart_img_path, Inches(0.8), Inches(1.3), Inches(11.733), Inches(5.4))

    # -------------------------------------------------------------
    # SLIDE 8 (NEW): WORKING PROTOTYPE: PATIENT INTERACTION & COGNITIVE GAMES
    # -------------------------------------------------------------
    s_proto1 = prs.slides.add_slide(blank_layout)
    add_template_chrome(s_proto1, "WORKING PROTOTYPE: ELDER HUB & COGNITIVE GAMES", "8")

    home_img_path = 'd:/SIH26_3/screenshot_home.png'
    games_img_path = 'd:/SIH26_3/screenshot_games.png'

    if os.path.exists(home_img_path) and os.path.exists(games_img_path):
        # Left card: Home Screen
        s_proto1.shapes.add_picture(home_img_path, Inches(0.8), Inches(1.4), Inches(5.7), Inches(4.2))
        lbl1 = s_proto1.shapes.add_textbox(Inches(0.8), Inches(5.7), Inches(5.7), Inches(1.0))
        tf_l1 = lbl1.text_frame
        tf_l1.word_wrap = True
        p = tf_l1.paragraphs[0]
        p.text = "Prototype View 1: Senior Patient Hub"
        p.font.bold = True
        p.font.size = Pt(14)
        p.font.color.rgb = RGBColor(5, 122, 85)
        p2 = tf_l1.add_paragraph()
        p2.text = "• Personalized morning greeting in Assamese/Hindi/English\n• High-Contrast WCAG AAA toggle & >52px tactile navigation targets\n• Audio voice guidance for non-literate rural elderly"
        p2.font.size = Pt(11)
        p2.font.color.rgb = RGBColor(71, 85, 105)

        # Right card: Games Arena
        s_proto1.shapes.add_picture(games_img_path, Inches(6.8), Inches(1.4), Inches(5.7), Inches(4.2))
        lbl2 = s_proto1.shapes.add_textbox(Inches(6.8), Inches(5.7), Inches(5.7), Inches(1.0))
        tf_l2 = lbl2.text_frame
        tf_l2.word_wrap = True
        p_r = tf_l2.paragraphs[0]
        p_r.text = "Prototype View 2: Cognitive Gaming Arena (4 Domains)"
        p_r.font.bold = True
        p_r.font.size = Pt(14)
        p_r.font.color.rgb = RGBColor(5, 122, 85)
        p_r2 = tf_l2.add_paragraph()
        p_r2.text = "• Cultural memory recall: Bihu Dhol, Hornbill, Muga Silk, Majuli\n• Real-time AI Adaptive pill: Latency (2.8s) & Comfort Index (88%)\n• Scaffolding: Voice hints prevent frustration & preserve dignity"
        p_r2.font.size = Pt(11)
        p_r2.font.color.rgb = RGBColor(71, 85, 105)

    # -------------------------------------------------------------
    # SLIDE 9 (NEW): WORKING PROTOTYPE: CAREGIVER INTELLIGENCE & GEOFENCE
    # -------------------------------------------------------------
    s_proto2 = prs.slides.add_slide(blank_layout)
    add_template_chrome(s_proto2, "CAREGIVER PORTAL & GEOFENCE SAFETY GUARD", "9")

    care_img_path = 'd:/SIH26_3/screenshot_caregiver.png'
    if os.path.exists(care_img_path):
        s_proto2.shapes.add_picture(care_img_path, Inches(0.8), Inches(1.3), Inches(8.0), Inches(5.4))
        
        # Right annotation panel
        panel = s_proto2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.1), Inches(1.3), Inches(3.433), Inches(5.4))
        panel.fill.solid()
        panel.fill.fore_color.rgb = RGBColor(248, 250, 252)
        panel.line.color.rgb = RGBColor(203, 213, 225)
        tf_p = panel.text_frame
        tf_p.word_wrap = True
        tf_p.margin_left = Inches(0.2)
        tf_p.margin_top = Inches(0.25)

        h = tf_p.paragraphs[0]
        h.text = "Clinical Intelligence Highlights"
        h.font.bold = True
        h.font.size = Pt(15)
        h.font.color.rgb = RGBColor(5, 122, 85)

        points = [
            ("MoCA Domain Radar", "Quantifies Memory (78%), Attention (84%), Visuospatial (80%), and Routine (86%)."),
            ("Weekly Latency Curve", "Tracks reaction speed from Monday to Sunday; alerts on sudden cognitive drops (>15%)."),
            ("GPS Safe-Zone Guard", "Simulated 300m geofence around Guwahati residence; dispatches instant SMS alerts on breach."),
            ("Doctor PDF Export", "Generates comprehensive progress reports for Guwahati Medical College consultations.")
        ]
        for title, desc in points:
            p_pt = tf_p.add_paragraph()
            p_pt.text = f"• {title}: {desc}"
            p_pt.font.size = Pt(11)
            p_pt.font.color.rgb = RGBColor(51, 65, 85)
            p_pt.space_before = Pt(8)

    # Save final deck
    prs.save(output_path)
    print(f"Deck with screenshots and flowchart successfully saved to: {output_path}")

if __name__ == "__main__":
    build_complete_deck()

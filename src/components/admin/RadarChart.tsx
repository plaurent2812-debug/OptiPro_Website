'use client'

import { PILIER_COLORS, PILIER_LABELS, type AuditPilierKey } from '@/data/audit-grid'

interface RadarChartProps {
  scores: Record<AuditPilierKey, number>
  size?: number
}

const PILIER_KEYS: AuditPilierKey[] = ['outils', 'process', 'communication', 'admin', 'digital', 'automatisation']

export default function RadarChart({ scores, size = 280 }: RadarChartProps) {
  const cx = size / 2
  const cy = size / 2
  const maxRadius = size / 2 - 40
  const angleStep = (2 * Math.PI) / PILIER_KEYS.length
  const startAngle = -Math.PI / 2 // Start from top

  // Generate polygon points for a given radius
  const getPolygonPoints = (radius: number) => {
    return PILIER_KEYS.map((_, i) => {
      const angle = startAngle + i * angleStep
      const x = cx + radius * Math.cos(angle)
      const y = cy + radius * Math.sin(angle)
      return `${x},${y}`
    }).join(' ')
  }

  // Generate data polygon
  const dataPoints = PILIER_KEYS.map((key, i) => {
    const score = scores[key] || 0
    const radius = (score / 10) * maxRadius
    const angle = startAngle + i * angleStep
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      key,
      score,
      labelX: cx + (maxRadius + 25) * Math.cos(angle),
      labelY: cy + (maxRadius + 25) * Math.sin(angle),
    }
  })

  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circles */}
      {[2, 4, 6, 8, 10].map((level) => (
        <polygon
          key={level}
          points={getPolygonPoints((level / 10) * maxRadius)}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={level === 10 ? 1.5 : 0.5}
          strokeDasharray={level === 10 ? 'none' : '2,4'}
        />
      ))}

      {/* Axis lines */}
      {PILIER_KEYS.map((_, i) => {
        const angle = startAngle + i * angleStep
        const endX = cx + maxRadius * Math.cos(angle)
        const endY = cy + maxRadius * Math.sin(angle)
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={endX}
            y2={endY}
            stroke="#E5E7EB"
            strokeWidth={0.5}
          />
        )
      })}

      {/* Data polygon */}
      <polygon
        points={dataPolygon}
        fill="rgba(79, 70, 229, 0.12)"
        stroke="#4F46E5"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Data dots */}
      {dataPoints.map((p) => (
        <circle
          key={p.key}
          cx={p.x}
          cy={p.y}
          r={4}
          fill={PILIER_COLORS[p.key]}
          stroke="white"
          strokeWidth={2}
        />
      ))}

      {/* Labels */}
      {dataPoints.map((p) => {
        const icon = (() => {
          switch (p.key) {
            case 'outils': return '🔧'
            case 'process': return '⚙️'
            case 'communication': return '📞'
            case 'admin': return '📋'
            case 'digital': return '🌐'
            case 'automatisation': return '⚡'
            default: return ''
          }
        })()
        return (
          <text
            key={p.key}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="600"
            fill="#374151"
          >
            {icon} {p.score.toFixed(1)}
          </text>
        )
      })}
    </svg>
  )
}
